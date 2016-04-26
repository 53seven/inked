// bivariate.js
import {default as BaseChart} from './base_chart';
import {default as Measure} from './measure';

class Bivariate extends BaseChart {

  constructor(opts) {
    super(opts);
    this.x(opts.x || new Measure());
    this.y(opts.y || new Measure());
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
      return this._x.val();
    }
    this._x.val(val);
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
      return this._y.val();
    }
    this._y.val(val);
    return this;
  }

}

export default Bivariate;
