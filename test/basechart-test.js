// barchart-test.js
var tape = require('tape-catch'),
    jsdom = require('jsdom'),
    charts = require('../');

tape('line chart is callable on a svg element', function(test) {
  var BaseChart = charts.BaseChart;

  var document = jsdom.jsdom();
  global.document = document;

  var chart = new BaseChart();

  delete global.document;
  test.end();
});
