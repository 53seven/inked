// bivariate.js
import {default as BaseChart} from './base_chart';
import {default as Measure} from './measure';

class Bivariate extends BaseChart {

  constructor(opts) {
    super(opts);
    opts.x = opts.x || new Measure();
    opts.y = opts.y || new Measure();
    this.extend({
      x: 'simple',
      y: 'simple',
      x_val: {
        get: () => {
          return this.x().val();
        },
        set: (val) => {
          this.x().val(val);
        }
      },
      y_val: {
        get: () => {
          return this.y().val();
        },
        set: (val) => {
          this.y().val(val);
        }
      }
    }, opts);
  }

}

export default Bivariate;
