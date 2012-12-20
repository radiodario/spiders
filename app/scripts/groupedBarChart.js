/* A grouped bar chart */
function groupedBarChart() {

  var width   = 600;
  var height  = 200;
  var margin  = {top:10, right:10, bottom:30, left:60};
  var title   = "Chart Title";
  var duration = 1000;
  var x0       = d3.scale.ordinal();
  var x1      = d3.scale.ordinal();
  var y       = d3.scale.linear().nice();
  var categoryValue  = function(d) { return d.name };
  var groupValue  = function(d) { return d.value }; 
  var colors  = d3.scale.category10();
  var yAxis = d3.svg.axis().orient('left').tickFormat(d3.format(".2s")).ticks(4);
  var xAxis = d3.svg.axis().orient('bottom');
  var yAxisTitle = "Y Axis";
  var xAxisTitle = "X Axis";
  
  function chart(selection) {
    selection.each(function (data) {
      // update sizes
      var w = width - margin.left - margin.right;
      var h = height - margin.top - margin.bottom;

      // data.groups is each category (i.e. what you want on the x axis)
      // data.layers is each value category (i..e each year)

      // update the scales
      x0
        .rangeRoundBands([0, w], 0.1)               // output rangeBands with spacing
        .domain(data.categories);

      x1
        .rangeRoundBands([0, x0.rangeBand()])
        .domain(data.groups);

      y
        .range([h, 0])                                // output range
        .domain([0, d3.max(data, function(category) {  // input domain
            return d3.max(data.groups, function(group) {
              return category[group]; // change to y0 to get the max of the group
            })
          })
        ]);

      yAxis.scale(y)
      xAxis.scale(x0);

      data = data.map(function(category) {
        return {
          name: categoryValue(category),
          groups: data.groups.map(function(group)  {
            return {
              name: group,
              value: category[group]
            }
          })
        };
      })

      // chart scaffolding
      var svg = d3.select(this).selectAll('svg').data([data]);
      var gEnter = svg.enter().append('svg').append('g');
      gEnter.append('g').attr('class', 'categories');
      gEnter.append('g').attr('class', 'x axis');
      gEnter.append('g').attr('class', 'y axis');
      gEnter.append('g').attr('class', 'title');


      // reassign data
      var category = svg.select('.categories').selectAll('.category')
        .data(function(d) { return d});

      var categoryEnter = category
        .enter()
        .append('svg:g')
        .attr("class", "category")
        .attr("transform", function(d, i) {
          return 'translate(' + x0(d.name) + ',0)';
        })
        
      var categoryExit  = category.exit()
        .transition()
        .duration(duration)
        .remove();

      var groups = category.selectAll('rect')
        .data(function(d) {
          return d.groups;
        })

      var groupEnter = groups.enter()
        .append('svg:rect')
        .attr('width', x1.rangeBand())
        .attr('x', function(d) { return x1(d.name)})
        .attr('y', function(d) { return h})
        .attr('height', function(d) { return 0})
        .style('fill', function(d, i) { return colors(i)});

      

      // update the outer dims
      svg
        .attr('width', width)
        .attr('height', height)

      // update the inner dimensions
      var g = svg.select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


      // update the bars
      g.selectAll('rect')
        .transition()
        .duration(duration)
        .attr('y', function(d) { return y(d.value)})
        .attr('height', function(d) { return h - y(d.value)})

      g.select('.y.axis')
        .transition()
        .duration(duration)
        .call(yAxis)

      g.select('.x.axis')
        .attr("transform", "translate(0," + h + ")")
        .transition()
        .duration(duration)
        .call(xAxis)




    })
  }

  // gettah settah
  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };
  
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };
    
  chart.duration = function(_) {
    if (!arguments.length) return duration;
    duration = _;
    return chart;
  };
    
  chart.title = function(_) {
    if (!arguments.length) return title;
    title = _;
    return chart;
  };

  chart.xAxisTitle = function(_) {
    if (!arguments.length) return xAxisTitle;
    xAxisTitle = _;
    return chart;
  };

  chart.yAxisTitle = function(_) {
    if (!arguments.length) return yAxisTitle;
    yAxisTitle = _;
    return chart;
  };

  chart.xScale = function(_) {
    if (!arguments.length) return x;
    x = _;
    return chart;
  };

  chart.yScale = function(_) {
    if (!arguments.length) return y;
    y = _;
    return chart;
  };

  chart.category = function(_) {
    if (!arguments.length) return categoryValue;
    categoryValue = _;
    return chart;
  };

  chart.group = function(_) {
    if (!arguments.length) return groupValue;
    groupValue = _;
    return chart;
  };



  return chart;
}