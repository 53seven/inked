// bivariate.js
import {default as BaseChart} from './base_chart';
import * as _ from 'lodash-es';

class Bivariate extends BaseChart {

  constructor(opts) {
    super(opts);
    this._x_val = function(d) { return d; };
    this._y_val = function(d) { return d; };
  }

  x(val) {
    if (!val) {
      return this._x;
    }
    this._x = val;
    return this;
  }

  xVal(val) {
    if (!val) {
      return this._x_val;
    }
    this._x_val = typeof val === 'string' ? function(d) { return _.at(d, val)[0]; } : val;
    return this;
  }

  y(val) {
    if (!val) {
      return this._y;
    }
    this._y = val;
    return this;
  }

  yVal(val) {
    if (!val) {
      return this._y_val;
    }
    this._y_val = typeof val === 'string' ? function(d) { return _.at(d, val)[0]; } : val;
    return this;
  }

  yAxisLabel(val) {
    if (!val) {
      return this._y_axis_label;
    }
    this._y_axis_label = val;
    return this;
  }


}

export default Bivariate;
