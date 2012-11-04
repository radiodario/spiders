/* a reusable spider chart */
function spiderChart() {
	// var data = [{a : 1, b: 3, c: 5, d: 3, e:4, f:2}];
	//var data = [5, 3, 1, 2, 5, 5,4, 2];
	var zeros = [0, 0, 0, 0, 0, 0,0, 0];
	var maxes = [5, 5, 5, 5, 5, 5,5, 5];
	var measures = ['a', 'b', 'c', 'd', 'e', 'f', 'g', "i"];

	console.log('drawing chart');


	// define the chart
	var margin = 30,
			height = 400,
			width = 400,
			radius = 100,
			ticks = 4, // how many ticks on the grid?
      value = function(d) { return d[0]; },
      label = function(d) { return d[1]; };
	// make some scales
	var scales = d3.scale.linear()
	var line = d3.svg.line()
		.x(function(d) { return d.x})
		.y(function(d) { return d.y});
		


	function chart (selection) {
		selection.each(function(data) {

			// scale update
			scales.domain([0, d3.max(data, value)]).range([0,radius]);

			
			// calculate the positions
			data = data.map(function(d, i){
				return {
					x: calculateX(d, i, data.length),
					y: calculateY(d, i, data.length),
					val: d[0],
					label: d[1]
				}
			})

			console.log(data)
			// select the svg element if it exists
			var svg = d3.select(this).selectAll("svg").data([data])

			// create the skeleton
			var gEnter = svg.enter().append("svg").append("g");
			gEnter.append("g").attr("class", "grid");
			gEnter.append("g").attr("class", "axes");
			gEnter.append("path").attr("class", "spider");

			// update the dimensions
			svg .attr("width", width)
			svg .attr("height", height)

			// update the inner dimensions
			var g = svg.select("g")
				.attr("transform", "translate(" + width/2 + "," + height/2 + ")");

			// the grid data, number of ticks
			var gridData = buildAxisGrid(data.length, ticks);

			console.log(gridData)

			// add the grid
			var gridEnter = g.select('.grid')
				.selectAll('.gridlevel')
				.data(gridData)
				.enter()
				.append("path").attr("class", "gridlevel")
				.style("stroke", "#000")
				.style("fill", "none")
	    	.style("opacity", 0.3)
	    	.attr("d", line);

			// update the paths
			//g.selectAll('gridLevel')
				




			// add the axes
			var ax = g.select("g.axes").selectAll("g.axis")
				.data(data)
				.enter().append("g").attr("class", "axis");

			ax.append("svg:text")
				.text(function(d){ return label(d)})
				.attr("x", function(d, i) { return Math.sin(angle(i, data.length)) * scales(5);})
				.attr("y", function(d, i) { return Math.cos(angle(i, data.length)) * scales(5);});

			ax.append("svg:line")
			    .style("stroke", "#000")
				.style("fill", "none")
	    	.style("opacity", 0.1)
				.attr("x1", function(d, i) { return Math.sin(angle(i, data.length)) * scales(scales.domain()[0]);})
				.attr("y1", function(d, i) { return Math.cos(angle(i, data.length)) * scales(scales.domain()[0]);})
				.attr("x2", function(d, i) { return Math.sin(angle(i, data.length)) * scales(scales.domain()[1]);})
				.attr("y2", function(d, i) { return Math.cos(angle(i, data.length)) * scales(scales.domain()[1]);})

			// update the spider line
			g.select('.spider')
	    	.style("fill", "#000")
	    	.style("opacity", 0.8)
	    	.attr("d", line)
				// .attr("d", function(e, i) {
			 //    	console.log(e, i);
			 //        return line()(e, i) + "Z";
			 //    });

			// update the spider chart
			g.select('.spider')
		    // .style("fill", "#009933")
		    // .style("opacity", 0.5)
		    // .attr("d", function(e, i) {
		    // 	return line()(zeros) + "Z";
		    // })
		    // .transition()
		    // .duration(1000)
		    // .attr("d", function(e, i) {
		    // 	console.log(e, i);
		    //     return line()(e) + "Z";
		    // });


		});
	}


	// compute an angle
	function angle(i, lenght) {
	  return i * (2 * Math.PI / lenght) +
    Math.PI/lenght;
	}

	// x-caclulator
	// d is the datapoint, i is the index, length is the length of the data
	function calculateX(d, i, length) {
    var l = scales(value(d));
    return Math.sin(angle(i, length)) * l;
  }

  // y-calculator
  function calculateY(d, i, length) {
    var l = scales(value(d));
    return Math.cos(angle(i, length)) * l;
  }

  // * build the spider axis * //
  // rewrite this to conform to d3 axis style? //
  function buildAxisGrid(length, ticks) {
  	
  	var min = scales.domain()[0];
  	var max = scales.domain()[1];
  	var increase = max/ticks;

  	gridData = []
  	for (var i = 0; i <= ticks; i++ ) {
  		val = min + i*increase;
  		var d = [val];
  		gridpoints = [];
  		for (var j = 0; j <= length; j++) {
  			gridpoints.push({
					x: calculateX(d, j, length),
					y: calculateY(d, j, length),
				})
  		};
  		gridData.push(gridpoints)
  	}

  	return gridData;

  }


  return chart;

}