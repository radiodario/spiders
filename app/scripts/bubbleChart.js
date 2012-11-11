// a bubble chart

function bubbleChart() {
	var margin = {top:10, right:10, bottom:10, left:10};
	var width  = 200;
	var height = 200;
	var offset = 0;
	var value  = function(d) { return d.count };
	var format = d3.format("n");
	var colors = d3.scale.category10();
	var bubble = d3.layout.pack().sort(null);
	var title  = 'Bubble Chart Title';
  var duration = 200;

	function chart (selection) {
		selection.each(function(data) {

			// prep the data
			var categories = {
				"name" : "",
				"count" : data.count,
				"children" : []
			}

			data.values.forEach(function(cat) {
				categories.children.push(cat);
			});

			// adjust the bubble generator (in case we've changed height/width/value)
			bubble.sort(null)
            .size([width - margin.left - margin.right, height - margin.top - margin.bottom])
            .value(value)
            .padding(1.5);

			var data = bubble.nodes(categories).filter(function(d) { return !d.children; });;

			// chart scaffolding
			var svg = d3.select(this).selectAll("svg").data([data]);
			var gEnter = svg.enter().append("svg").append("g");

			// update outer dimensions
			svg
				.attr("width", width)
				.attr("height", height)

			// update the inner dimensions
			var g = svg.select('g')
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var nodes = g.selectAll("g.node").data(function(d) { return d;})
			
			nodes.exit().remove();

 			// update chilling points
      g.selectAll('circle')
          .data(function(d) {return d;})      

      g.selectAll('text.label')
          .data(function(d) {return d;})


			var nodesEnter = nodes.enter();

			var node = nodesEnter.append('g')
				.attr("class", "node")
				
			node.append("circle")
				.attr("r", 0)
				.attr("cx", 0)
				.attr("cy", 0)
				.attr("class", "seriespoint")

			node.append("text")
				.attr("class", "label")
				.attr("text-anchor", "middle")
				.attr("dy", ".3em")
				.style("fill", "#fff")

			g.selectAll("g.node")
				.transition()
				.duration(duration)
				.attr("transform", function(d) { return "translate(" + d.x + "," + (d.y + offset) + ")";})

			// update the points
			g.selectAll("circle")
				.transition()
				.duration(duration)
				.attr("r", function(d) {return d.r})
				.style("fill", function(d, i) {return colors(i)});

			g.selectAll("text.label")
				.style("font-size", function(d) { 
                        var size = d.r/3
                        // if (size < 11) {
                        //     return '10pt';
                        // } else {
                            return size + 'pt';
                        // }
                    })
				.text(function (d) { return d.name;})


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

  chart.offset = function(_) {
    if (!arguments.length) return offset;
    offset = _;
    return chart;
  };

  chart.value = function(_) {
    if (!arguments.length) return value;
    value = _;
    return chart;
  };

  chart.format = function(_) {
    if (!arguments.length) return format;
    format = _;
    return chart;
  };

  chart.colors = function(_) {
    if (!arguments.length) return colors;
    colors = _;
    return chart;
  };

  chart.title = function(_) {
    if (!arguments.length) return title;
    title = _;
    return chart;
  };

  chart.duration = function(_) {
    if (!arguments.length) return duration;
    duration = _;
    return chart;
  };






	return chart;
}