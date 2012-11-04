define([], function() {
    // var data = [{a : 1, b: 3, c: 5, d: 3, e:4, f:2}];
	var data =[[5, 'a'], [3, 'b'], [1,'c'], [2,'d'], [5,'e'], [5,'f'],[4,'g'], [2, 'i']];



	var chart = spiderChart();
  d3.select('#spider-chart')
  	.datum(data)
  	.call(chart)
  
});