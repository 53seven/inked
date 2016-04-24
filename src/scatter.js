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

    var x = d3_scale.scaleLinear()
        .range([0, this.width()]);

    var y = d3_scale.scaleLinear()
        .range([this.height(), 0]);

    var xAxis = d3_axis.axisBottom()
        .scale(x);

    var yAxis = d3_axis.axisLeft()
        .scale(y);

    x.domain(d3_extent(data, this._x_val));
    y.domain(d3_extent(data, this._y_val));

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
        .attr('r', 1)
        .attr('cx', (d) => { return x(this._x_val(d)); })
        .attr('cy', (d) => { return y(this._y_val(d)); });
  }

}

export default ScatterChart;
