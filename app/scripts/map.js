
function map() {
  var po = org.polymaps;
  var width = 930;
  var height = 500;
  var center = {lat: 40.00, lon:-75.1642};
  var zoom = 4;
  var api_key = "cab4b4cb386f4890b042a94ef2b87332"; // http://cloudmade.com/register
  var format = d3.format('n')
  var colorScale = d3.scale.linear().range(["#FE326B","#888","#64C832"]);
  var sizeScale = d3.scale.linear().range([0,10]);
  var duration = 1000;

  var map = po.map()


  function chart(selection) {
    selection.each(function(data) {

      // select the map container
      var container = d3.select(this).select("svg")
      if (container[0][0] == null) {
        container = d3.select(this)
          .append("svg:svg")
          .attr("width", width)
          .attr("height", height).node()
        // update the map and add components
        map .zoom(zoom)
            .center(center)
            .container(container)
            .add(po.interact()) // add interactivity
            .add(po.image()
              .url(po.url("http://{S}tile.cloudmade.com"
              + "/" + api_key 
              + "/53991/256/{Z}/{X}/{Y}.png")
              .hosts(["a.", "b.", "c.", ""]))
              )
            .add(po.compass()
              .position("bottom-left")
              .pan("small"));



      }

      // update the sizes
      sizeScale.domain([0, d3.max(data, function(d) { return d.count })])

      // add the locations
      // Select our layer beneath the compass.

      var markers = d3.select(this).select("svg").selectAll('g.markers').data([data])
      // if it's not there add it under the .compass
      markers.enter().insert("svg:g", ".compass").attr("class", "markers");

      // Add an svg:g for each station.
      var marker = markers.selectAll("circle")
          .data(function(d) { return d });


      marker.exit().selectAll('circle')
        .transition()
        .duration(duration)
        .attr("r", 0).remove()

      // add circles
      marker.enter()
          .append("svg:circle")
          .attr("class","marker")
          .attr("rel", "tooltip")
          .attr("r", 0)
          .attr("title", function(d) { 
            return d.en + ": "+format(d.count)
          })
          .attr("transform", function(d) {
            
            return transform(d);
          })

      // update the circle sizes
      marker.transition()
          .duration(duration)
          .style("stroke", "#70A194")
          .style("opacity", 1)
          .style("fill", function(d) {
            return "#70AF94"
          })
          .attr("r", function (d) {
            return sizeScale(d.count);
          });

      // Whenever the map moves, update the marker positions.
      map.on("move", function() {
        markers.selectAll("circle.marker").attr("transform", function(d) {
          return transform(d)
          });
      });
      
      // do the same when we resize the map
      map.on("resize", function() {
        markers.selectAll("circle.marker").attr("transform", function(d) {
          return transform(d)
          });
      });

      $('circle').tooltip();

    });
  }

  function transform(d) {
        var p = map.locationPoint({lon: d.location.lng, lat: d.location.lat});
        return "translate(" + p.x + "," + p.y + ")";
  }

  chart.center = function(_) {
    if (!arguments.length) return center;
    center = _;
    return chart;
  }
  chart.duration = function(_) {
    if (!arguments.length) return duration;
    duration = _;
    return chart;
  }

  return chart;

}


