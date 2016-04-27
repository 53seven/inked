// histogram.js
import {default as Bivariate} from './bivariate';
import {max as d3_max, extent as d3_extent} from 'd3-array';
import * as d3_scale from 'd3-scale';
import * as d3_axis from 'd3-axis';

class ScatterChart extends Bivariate {

  constructor(opts) {
    super(opts);
  }

  plot() {
    var data = this.data();

    var x = this.x();
    x.range([0, this.width()]);

    var y = this.y();
    y.range([this.height(), 0]);

    var xAxis = d3_axis.axisBottom()
        .scale(x.scale());

    var yAxis = d3_axis.axisLeft()
        .scale(y.scale());

    x.fit(data);
    y.fit(data);

    this.g().append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + this.height() + ')')
        .call(xAxis);

    this.g().append('g')
        .attr('class', 'y axis')
        .call(yAxis)
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text(this._y_axis_label);

    this.g().selectAll('circle.point').data(data).enter()
        .append('circle').attr('class', 'point')
        .attr('r', this.r())
        .attr('fill', this.fill())
        .attr('cx', x.m())
        .attr('cy', y.m());
  }

  r(val)  {
    if (!val) {
      return this._r;
    }
    this._r = val;
    return this;
  }

  fill(val) {
    if (!val) {
      console.log(this._fill);
      return this._fill;
    }
    this._fill = val;
    return this;
  }

}

export default ScatterChart;
