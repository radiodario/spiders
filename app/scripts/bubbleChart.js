// a bubble chart

function bubbleChart() {
	var margin = {top:10, right:10, bottom:10, left:10};
	var width  = 500;
	var height = 200;
	var offset = -2;
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

			var data = bubble.nodes(categories);

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
				.text(function (d) { return d.name;})


		});
	}








	return chart;
}