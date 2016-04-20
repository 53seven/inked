// line_chart.js
import {default as BaseChart} from './base_chart';
import * as d3_shape from 'd3-shape';

class LineChart extends BaseChart {

  constructor(opts) {
    super(opts);
    this._x_val = function(d) { return d; };
    this._y_val = function(d) { return d; };
  }

  plot(data) {
    var line = d3_shape.line()
        .x((d) => { return this._x(this._x_val(d)); })
        .y((d) => { return this._y(this._y_val(d)); });

    var path = this.g().selectAll('path.line')
        .data([data]);

    path.attr('d', line);

    path.enter().append('path')
        .attr('d', line)
        .attr('class', 'line');
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
    this._x_val = val;
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
    this._y_val = val;
    return this;
  }

}
export default LineChart;
