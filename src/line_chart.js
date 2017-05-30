// line_chart.js
import {default as Bivariate} from './bivariate';
import {default as Axes} from './axes';
import * as d3_shape from 'd3-shape';
import * as _ from 'lodash-es';

class LineChart extends Bivariate {

  constructor(opts) {
    super(opts);
    this._axes = new Axes(this);
  }

  plot() {
    var data = this.data();

    // check to see if there are multiple series of data
    if (!Array.isArray(data[0])) {
      data = [data];
    }

    // flatten the data so that we can have the scales line up
    var flat_data = _.flatten(data);

    var x = this.x();
    x.range([0, this.width()]);
    x.fit(flat_data);

    var y = this.y();
    y.range([this.height(), 0]);
    y.fit(flat_data);

    var line = d3_shape.line()
        .x(x.m())
        .y(y.m());

    // now draw a path for each series in the data
    var path = this.g().selectAll('path.line')
        .data(data);

    path.enter().append('path')
        .attr('d', line)
        .attr('class', 'line');

    path.transition()
        .duration(500)
        .attr('d', line);
  }

  decorate() {
    this._axes.plotLeft(this.y());
    this._axes.plotBottom(this.x());
  }

}
export default LineChart;
