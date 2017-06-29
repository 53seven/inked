const jsdom = require('jsdom');
const dom = new jsdom.JSDOM();
global.document = dom.window.document;
const charts = require('../');

describe('mutableprop', () => {
  let mut = new charts.MutableProp();
  console.log(mut);
  console.log(mut.addProp('foo'));
  console.log(mut.foo());
  console.log(mut.foo('foo'));
  console.log(mut.foo());
  console.log(mut.addProp('foo'));
});
