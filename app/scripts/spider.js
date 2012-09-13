(function() {
	// var data = [{a : 1, b: 3, c: 5, d: 3, e:4, f:2}];
	var data = [5, 3, 1, 2, 5, 5,4, 2];
	var zeros = [0, 0, 0, 0, 0, 0,0, 0];
	var maxes = [5, 5, 5, 5, 5, 5,5, 5];
	var measures = ['a', 'b', 'c', 'd', 'e', 'f', 'g', "i"];

	console.log('drawing chart');


	// define the chart
	var margin = 30,
		height = 400,
		width = 400
		radius = 100;

	// make some scales
	var scales = d3.scale.linear().domain([0, 5]).range([0,radius]);

	var container = d3.select('#spider-chart').append("svg")
				.append("g")
				.attr("transform", "translate(" + (radius + margin) + "," + (radius + margin) +")");

	function angle(i) {
    return i * (2 * Math.PI / measures.length) +
        Math.PI/measures.length;
	}

	function line(f) {
		console.log(f);
	    return d3.svg.line()
	        .x(function(e, i) {
	            var l = scales(e);
	            return Math.sin(angle(i)) * l;
	        })
	        .y(function(e, i) {
	            var l = scales(e);
	            return Math.cos(angle(i)) * l;
	        });
	}


	var ax = container.append("g").attr("class", "axes").selectAll("g.axis")
		.data(measures)
		.enter().append("g").attr("class", "axis");

	ax.append("svg:text")
		.text(function(d){ return d})
		.attr("x", function(d, i) { return Math.sin(angle(i)) * scales(5);})
		.attr("y", function(d, i) { return Math.cos(angle(i)) * scales(5);});

	ax.append("svg:line")
	    .style("stroke", "#AAF")
	    .style("stroke-width", 1)
		.attr("x1", function(d, i) { return Math.sin(angle(i)) * scales(0);})
		.attr("y1", function(d, i) { return Math.cos(angle(i)) * scales(0);})
		.attr("x2", function(d, i) { return Math.sin(angle(i)) * scales(5);})
		.attr("y2", function(d, i) { return Math.cos(angle(i)) * scales(5);});



	container.append("g").append("path")
	    .style("fill", "#000")
	    .style("opacity", 0.1)
		.attr("d", function(e, i) {
	    	console.log(e, i);
	        return line()(maxes) + "Z";
	    });

	container.append("g").selectAll("path")
	    .data([data])
	    .enter()
	    .append("svg:path")
	    .style("fill", "#009933")
	    .style("opacity", 0.5)
	    .attr("d", function(e, i) {
	    	return line()(zeros) + "Z";
	    })
	    .transition()
	    .duration(1000)
	    .attr("d", function(e, i) {
	    	console.log(e, i);
	        return line()(e) + "Z";
	    });






})();