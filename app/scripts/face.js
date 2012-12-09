// a face to show happiness from 0 to 100


function face() {

  var margin = { top: 10, left: 10, bottom: 10, right: 10}
  var height = 100;
  var width = 100;
  var color = d3.scale.linear()
          .domain([0,100])
          .range(["#ff0000", "#0000ff"])

  var mouthScale = d3.scale.linear()
          .domain([0, 100])
  var eyeSize = 0.1; // 0 to 100 % of face radius
  var duration = 1000;


  function chart(selection) {
    selection.each(function(data) {

        // update the radius
        var r = d3.max([(height - margin.top - margin.bottom)/2, (width - margin.left - margin.right)/2]);

        // update the mouth scale
        mouthScale.range([-r/2, r/2]);

        console.log(data, r);

        var svg = d3.select(this).selectAll('svg').data([data])
        var faceEnter = svg.enter()
            .append("svg")
            .append("g").attr("class", "face");
        // add the head circle
        faceEnter.append("svg:circle")
            .attr("class", "head")
            .attr("stroke", "none")
            .attr("fill", "#333")
            .attr("r", r);    
        // add the mouth
        faceEnter.append("svg:path")
            .attr("class", "mouth")
            .attr("stroke", "none")
            .attr("stroke-width", 4)
            .attr("fill", "#fff")
            .attr("transform", "translate(" + [0, r/3] + ")")
        // add the left eye
        faceEnter.append("svg:circle")
            .attr("class", "eye")
            .attr("stroke", "none")
            .attr("fill", "#fff")
            .attr("stroke-width", 4)
            .attr("transform", "translate(" + [-r/2.5, -r/3] + ")")
        // and the right eye
        faceEnter.append("svg:circle")
            .attr("class", "eye")
            .attr("stroke", "none")
            .attr("fill", "#fff")
            .attr("stroke-width", 4)
            .attr("transform", "translate(" + [r/2.5, -r/3] + ")")

        // update the outer dimensions
        svg
          .attr('width', width)
          .attr('height', height);

        // update the inner dimensions
        var face = svg.select('g.face')
          .attr('transform', 'translate(' + (margin.top + r) + ',' + (margin.bottom + r) + ')');

        // the mouth point positions
        var mouth = { 
          x : [0, 50, 100],
          y : [50, data, 50] 
        };


        // the line maker for the mouth
        var mouth_line = d3.svg.line()
            .x(function(d,i) {
                return mouthScale(mouth.x[i]);
            })
            .y(function(d,i) {
                return mouthScale(mouth.y[i]);
            })
            .interpolate("basis");

        // update the head
        face.select('circle.head')
          .transition()
          .duration(duration)
          .attr("fill", function(d) { console.log(d); return color(d); })
          .attr("r", r);

        // update the mouth
        face.selectAll('.mouth')
          .transition()
          .duration(duration)
          .attr("d", mouth_line(mouth.x));
            
        // update the eyes
        face.selectAll('.eye')
          .attr("r", r * eyeSize);



    });



  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  }; 

  chart.interpolate = function(_) {
    if (!arguments.length) return interpolate;
    interpolate = _;
    return chart;
  };

  return chart;

}