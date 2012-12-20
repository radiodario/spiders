define([], function() {
    // var data = [{a : 1, b: 3, c: 5, d: 3, e:4, f:2}];

   var time = 5000;

  //setInterval(function() {

  function buildCharts() {

  	var howMany = 100;
  	// generate some random data to mimic a csv
  	var genres = ['dubstep', 'trap', 'funk', 'chillwave', 'witch house'];
  	var years = ['2007', '2011'];
  	var barData = genres.map(function(genre) {
			var row = {
				genre : genre
			};
			years.forEach(function(year) {
				row[year] = Math.random() * howMany;
			});
			return row;
  	})

  	// we add the groups and the categories
  	barData.groups = years;
  	barData.categories = genres;

  	// the bar chart object 
  	var bar = groupedBarChart()
  		.yAxisTitle('Youtube likes')
  		.title('Most popular youtube music genres')
  		.duration(500)
  		.width($('.container').width())
  		.category(function(d) { return d.genre })

		d3.select('#bar-chart')
			.datum(barData)
			.call(bar);






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


		// maps

		var mapchart = map()

		mapchart.center({"lat":39.90403,"lon":116.407526})
						.duration(time)

		d3.json('locations.json', function(data) {

			data.forEach(function(d) { d.count = Math.random() * 100})

			d3.select('#map-chart').datum(data).call(mapchart);


		// face

		var facechart = face().duration(time)

		d3.select('#face-chart').datum(Math.random()*100).call(facechart);


		})



	}

	buildCharts();

	setInterval(buildCharts, time);

});