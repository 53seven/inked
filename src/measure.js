// measure.js
import * as _ from 'lodash-es';
import * as d3_scale from 'd3-scale';
import * as d3_array from 'd3-array';

// A measure class acts as a bridge between a data's vals and scales
// Generally, this makes it easy to apply the same scale to several charts
class Measure {

  constructor(opts) {
    opts = opts || {};
    this.scale(opts.scale || d3_scale.scaleLinear());
    this.val(opts.val || function(d) { return d; });
    this.round(opts.round || false);
    if (opts.range) {
      this.range(opts.range);
    }
    if (opts.domain) {
      this.domain(opts.domain);
    }
  }

  // val on the data
  val(val) {
    if (_.isUndefined(val)) {
      return this._val;
    }
    this._val = typeof val === 'string' ? function(d) { return _.at(d, val)[0]; } : val;
    return this;
  }

  scale(val) {
    if (_.isUndefined(val)) {
      return this._scale;
    }
    this._scale = val;
    return this;
  }

  domain(val) {
    if (_.isUndefined(val)) {
      return this._scale.domain();
    }
    this._scale.domain(val);
    return this;
  }

  range(val) {
    if (_.isUndefined(val)) {
      return this._scale.range();
    }
    this._scale.range(val);
    return this;
  }

  // amount to round domain buy
  round(val) {
    if (_.isUndefined(val)) {
      return this._round;
    }
    this._round = val;
    return this;
  }

  eval(d, i) {
    return this.scale()(this.val()(d, i));
  }

  m() {
    var self = this;
    // D3 does some binding magic => cannot trust `this`
    return function(d, i) {
      return self.eval(d, i);
    };
  }

  // determines the extent of the given data
  // useful for figuring out a global min/max,
  // then displaying subsets on various charts
  fit(data) {
    var domain = d3_array.extent(data, this.val());
    // round out the domain as needed
    if (this.round() !== false) {
      domain[0] = Math.floor(domain[0] / this.round()) * this.round();
      domain[1] = Math.ceil(domain[1] / this.round()) * this.round();
    }
    this.domain(domain);
    return this;
  }

}

export default Measure;

