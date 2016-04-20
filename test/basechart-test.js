// barchart-test.js
var tape = require('tape-catch'),
    jsdom = require('jsdom'),
    d3_svg = require('d3-svg'),
    charts = require('../');

tape('line chart is callable on a svg element', function(test) {
  var BaseChart = charts.BaseChart;
  var LineChart = charts.LineChart;

  var document = jsdom.jsdom();
  global.document = document;

  var svg = d3_svg.create('body');
  test.ok(svg, 'svg element exists');

  var chart = new BaseChart();
  var line = new LineChart();

  svg.datum([{foo: 'bar'}]);
  line.render(svg);

  delete global.document;
  test.end();
});
