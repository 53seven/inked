// barchart-test.js
console.log('test')
var tape = require('tape-catch'),
    jsdom = require('jsdom');
    //charts = require('../');
console.log('asdf')
tape('line chart is callable on a svg element', function(test) {
  console.log('tape')
  var BaseChart = charts.BaseChart;

  var document = jsdom.jsdom();
  global.document = document;

  var chart = new BaseChart();

  console.log(chart)
  test.ok(true);

  delete global.document;
  test.end();
});
