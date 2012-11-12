function sparkline() {

	var margin = {top:1, bottom:1, left:1, right:1};
  var height = 30;
  var width  = 100;
  var xValue = function(d, i) { return i };
  var yValue = function(d) { return d };
  var interpolate = 'linear';
  var xScale = d3.scale.linear();
  var yScale = d3.scale.linear();
  var line   = d3.svg.line().interpolate(interpolate).x(X).y(Y);
  var duration = 1000;

  function chart(selection) {
  	selection.each(function(data) {

      // Update the x-scale.
      xScale
          .domain([0, data.length])
          .range([0, width - margin.left - margin.right]);

      // Update the y-scale.
      yScale
          .domain(d3.extent(data))
          .range([height - margin.top - margin.bottom, 0]);

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([data]);

      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter().append("svg").append("g");
      gEnter.append("path").attr("class", "sparkline")
      	.style('fill', 'none')
      	.style('stroke', 'steelblue');

      // Update the outer dimensions.
      svg .attr("width", width)
          .attr("height", height);

      // Update the inner dimensions.
      var g = svg.select("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Update the line path.
      g.select(".sparkline")
      		.transition()
      		.duration(duration)
          .attr("d", line);

    });
  }

  // The x-accessor for the path generator; xScale âˆ˜ xValue.
  function X(d, i) {
    return xScale(i);
  }

  // The x-accessor for the path generator; yScale âˆ˜ yValue.
  function Y(d) {
    return yScale(d);
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

  chart.x = function(_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return chart;
  };  

  chart.interpolate = function(_) {
    if (!arguments.length) return interpolate;
    interpolate = _;
    return chart;
  };

  chart.duration = function(_) {
    if (!arguments.length) return duration;
    duration = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return chart;
  };

  return chart;
}