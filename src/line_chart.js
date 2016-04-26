// line_chart.js
import {default as Bivariate} from './bivariate';
import * as d3_shape from 'd3-shape';

class LineChart extends Bivariate {

  constructor(opts) {
    super(opts);
  }

  plot() {
    var data = this.data();
    var line = d3_shape.line()
        .x(this.x().m())
        .y(this.y().m());

    var path = this.g().selectAll('path.line')
        .data([data]);

    path.attr('d', line);

    path.enter().append('path')
        .attr('d', line)
        .attr('class', 'line');
  }

}
export default LineChart;
