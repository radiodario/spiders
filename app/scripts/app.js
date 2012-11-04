define([], function() {
    // var data = [{a : 1, b: 3, c: 5, d: 3, e:4, f:2}];
	var data =[[5, 'stamina'], 
						 [3, 'power'], 
						 [1,'attack'], 
						 // [2,'defense'], 
						 // [5,'energy'], 
						 // [5,'magic'],
						 [4,'charisma'], 
						 [2, 'awesome']];



	var chart = spiderChart();
  d3.select('#spider-chart')
  	.datum(data)
  	.call(chart)
  
});