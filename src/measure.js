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
    this.round(opts.round || 1);
  }

  // val on the data
  val(val) {
    if (!val) {
      return this._val;
    }
    this._val = typeof val === 'string' ? function(d) { return _.at(d, val)[0]; } : val;
    return this;
  }

  scale(val) {
    if (!val) {
      return this._scale;
    }
    this._scale = val;
    return this;
  }

  domain(val) {
    if (!val) {
      return this._scale.domain();
    }
    this._scale.domain(val);
    return this;
  }

  range(val) {
    if (!val) {
      return this._scale.range();
    }
    this._scale.range(val);
    return this;
  }

  // amount to round domain buy
  round(val) {
    if (!val) {
      return this._round;
    }
    this._round = val;
    return this;
  }

  m() {
    var self = this;
    // D3 does some binding magic => cannot trust `this`
    return function(d, i) {
      return self.scale()(self.val()(d, i));
    };
  }

  // determines the extent of the given data
  // useful for figuring out a global min/max,
  // then displaying subsets on various charts
  fit(data) {
    var domain = d3_array.extent(data, this.val());
    // round out the domain as needed
    domain[0] = Math.floor(domain[0] / this.round()) * this.round();
    domain[1] = Math.ceil(domain[1] / this.round()) * this.round();
    this.scale().domain(domain);
    return this;
  }

}

export default Measure;

