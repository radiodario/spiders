define([], function() {
    // var data = [{a : 1, b: 3, c: 5, d: 3, e:4, f:2}];

   var time = 2000;

  //setInterval(function() {

  function buildCharts() {

		var data =[[Math.random(), 'Strength'], 
							 [Math.random(), 'Constitution'], 
							 [Math.random(),'Dexterity'], 
							 [Math.random(),'Intelligence'], 
							 [Math.random(),'Wisdom'], 
							 [Math.random(),'Charisma']];

		var chart = spiderChart().duration(time);
	  d3.select('#spider-chart')
	  	.datum(data)
	  	.call(chart);

	 
	  var stackedData = [
			{
		    "name": "apples",
		    "values": [
		      { "x": new Date('2012-01-01'), "y":  100*Math.random()},
		      { "x": new Date('2012-01-02'), "y":  100*Math.random()},
		      { "x": new Date('2012-01-03'), "y":  100*Math.random()},
		      { "x": new Date('2012-01-04'), "y":  100*Math.random()},
		      { "x": new Date('2012-01-05'), "y":  100*Math.random()},
		      { "x": new Date('2012-01-06'), "y":  100*Math.random()},
		      { "x": new Date('2012-01-07'), "y":  100*Math.random()},
		      { "x": new Date('2012-01-08'), "y":  100*Math.random()},
		      { "x": new Date('2012-01-09'), "y":  100*Math.random()},
		      { "x": new Date('2012-01-10'), "y":  100*Math.random()}
		    ]
		  },
		  {  
		    "name": "oranges",
		    "values": [
					{ "x": new Date('2012-01-01'), "y":  100*Math.random()},
		      { "x": new Date('2012-01-02'), "y":  100*Math.random()},
		      { "x": new Date('2012-01-03'), "y":  100*Math.random()},
		      { "x": new Date('2012-01-04'), "y":  100*Math.random()},
		      { "x": new Date('2012-01-05'), "y":  100*Math.random()},
		      { "x": new Date('2012-01-06'), "y":  100*Math.random()},
		      { "x": new Date('2012-01-07'), "y":  100*Math.random()},
		      { "x": new Date('2012-01-08'), "y":  100*Math.random()},
		      { "x": new Date('2012-01-09'), "y":  100*Math.random()},
		      { "x": new Date('2012-01-10'), "y":  100*Math.random()}
		    ]
		  }
		];

		//console.log(stackedChart)
	  var stacked = stackedChart()
	  	.duration(time)
	  	.title("Are oranges more popular than apples?")
	  	.yAxisTitle("Fruit Impact (Millions of Gallons of Juice)");
	  d3.select('#stacked-chart')
	  	.datum(stackedData)
	  	.call(stacked);

	  var bubbleData = {
	  	name : 'something',
	  	count : 100*Math.random(),
	  	values : [
	  		{name : 'Sorrow', count: Math.random()},
	  		{name : 'Joy', count: Math.random()},
	  		{name : 'Love', count: Math.random()},
	  		{name : 'Desire', count: Math.random()},
	  		{name : 'Loathe', count: Math.random()},
	  		{name : 'Fear', count: Math.random()},
	  		{name : 'Anger', count: Math.random()}
	  	]
		};

		var bubbles = bubbleChart();
			//.duration(time)
		d3.select('#bubble-chart')
			.datum(bubbleData)
			.call(bubbles);



	}

	buildCharts();

	setInterval(buildCharts, time);

});