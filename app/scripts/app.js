define([], function() {
    // var data = [{a : 1, b: 3, c: 5, d: 3, e:4, f:2}];

  setInterval(function() {


	var data =[[Math.random(), 'Strength'], 
						 [Math.random(), 'Constitution'], 
						 [Math.random(),'Dexterity'], 
						 [Math.random(),'Intelligence'], 
						 [Math.random(),'Wisdom'], 
						 [Math.random(),'Charisma']];

	var chart = spiderChart();
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
	      { "x": new Date('2012-01-04'), "y":  100*Math.random()}
	    ]
	  },
	  {  
	    "name": "oranges",
	    "values": [
				{ "x": new Date('2012-01-01'), "y":  100*Math.random()},
	      { "x": new Date('2012-01-02'), "y":  100*Math.random()},
	      { "x": new Date('2012-01-03'), "y":  100*Math.random()},
	      { "x": new Date('2012-01-04'), "y":  100*Math.random()}
	    ]
	  }
	];

	//console.log(stackedChart)
  var stacked = stackedChart();
  d3.select('#stacked-chart')
  	.datum(stackedData)
  	.call(stacked);

   }, 1000);

});