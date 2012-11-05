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
  	.call(chart)

  }, 1000);


  
});