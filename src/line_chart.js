// line_chart.js
import {default as Bivariate} from './bivariate';
import {default as Axes} from './axes';
import * as d3_shape from 'd3-shape';
import {default as pathTween} from './util/pathTween.js';

class LineChart extends Bivariate {

  constructor(opts) {
    super(opts);
    this._axes = new Axes(this);
  }

  plot() {
    var data = this.data();
    var x = this.x();
    x.range([0, this.width()]);

    var y = this.y();
    y.range([this.height(), 0]);

    var line = d3_shape.line()
        .x(x.m())
        .y(y.m());

    var path = this.g().selectAll('path.line')
        .data([data]);


    path.enter().append('path')
        .attr('d', line)
        .attr('class', 'line');

    path.transition()
        .duration(500)
        .attrTween('d', pathTween(line, 4));
  }

  decorate() {
    this._axes.plotLeft(this.y());
    this._axes.plotBottom(this.x());
  }

}
export default LineChart;
