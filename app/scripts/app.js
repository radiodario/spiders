define([], function() {
    // var data = [{a : 1, b: 3, c: 5, d: 3, e:4, f:2}];

   var time = 5000;

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
	  		{name : 'Sweet', count: Math.random()},
	  		{name : 'Sour', count: Math.random()},
	  		{name : 'Salty', count: Math.random()},
	  		{name : 'Bitter', count: Math.random()},
	  		{name : 'Umami', count: Math.random()}
	  	]
		};

		var bubbles = bubbleChart()
			.duration(time);
		d3.select('#bubble-chart')
			.datum(bubbleData)
			.call(bubbles);


		// SPARKLINES
		var races = 200;
		var drivers = ['vet', 'alo', 'rai'];
		var raceData = drivers.map(function(driver) {
			return {
				id : driver,
				pos : genPos(races)
			}
		});

		function genPos(races) {
			var a = []
			for (var i = 0; i < races; i++) {
				a.push(22*Math.random());
			}
			return a;
		}

		var spark = sparkline()
			.duration(time)
			.height(20)
			.width(300);

		raceData.forEach(function(data) {
			d3.select('#' + data.id)
				.datum(data.pos)
				.call(spark);
		})


		// tables
		var tabledata = {
			headers: ["Fruit", "Sales", "Quality"],
			rows : [
				["Apples", Math.random()*1000, Math.random()*10],
				["Pears", Math.random()*1000, Math.random()*10],
				["Oranges", Math.random()*1000, Math.random()*10]
			]
		}

		var tabl = table()

		d3.select('#table-chart').datum(tabledata)
			.call(tabl)


	}

	buildCharts();

	setInterval(buildCharts, time);

});