// formula.js
// an easy way to draw arbitrary formulae
import {isUndefined, range} from 'lodash-es';
import {default as Measure} from './measure';

class Formula {

  constructor(opts) {
    this.sample(opts.sample || 10);
    var domain = opts.domain || [0, 1];
    this.domain(domain);
    this.input(opts.input || new Measure());
    var output = new Measure({
      val: opts.val
    });
    this.output(output);
    this.fit();
  }

  val(val) {
    if (isUndefined(val)) {
      return this.output().val();
    }
    this.output().val(val);
    return this;
  }

  sample(val) {
    if (isUndefined(val)) {
      return this._sample;
    }
    this._sample = val;
    return this;
  }

  domain(val) {
    if (isUndefined(val)) {
      return this._domain;
    }
    this._domain = val;
    return this;
  }

  input(val) {
    if (isUndefined(val)) {
      return this._input;
    }
    this._input = val;
    return this;
  }

  output(val) {
    if (isUndefined(val)) {
      return this._output;
    }
    this._output = val;
    return this;
  }

  eval(val) {
    return this._output.val()(val);
  }

  data() {
    var d = this.domain();
    var num_points = Math.abs(d[0] - d[1]) / this.sample();
    return range(d[0], d[1], num_points);
  }

  fit() {
    var data = this.data();
    this.input().fit(data);
    this.output().fit(data);
  }

}

export default Formula;