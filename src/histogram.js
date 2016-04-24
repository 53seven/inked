// histogram.js
import {default as Bivariate} from './bivariate';
import {max as d3_max} from 'd3-array';
import * as d3_scale from 'd3-scale';
import * as d3_axis from 'd3-axis';

class Histogram extends Bivariate {

  constructor(opts) {
    super(opts);
  }

  plot() {
    var data = this.data();

    var x = d3_scale.scaleBand()
        .rangeRound([0, this.width()])
        .paddingInner(0.1);

    var y = d3_scale.scaleLinear()
        .range([this.height(), 0]);

    var xAxis = d3_axis.axisBottom()
        .scale(x);

    var yAxis = d3_axis.axisLeft()
        .scale(y);

    x.domain(data.map(this._x_val));
    y.domain([0, d3_max(data, this._y_val)]);

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

    this.g().selectAll('.bar')
        .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => { return x(this._x_val(d)); })
        .attr('y', (d) => { return y(this._y_val(d)); })
        .attr('height', (d) => { return this.height() - y(this._y_val(d)); })
        .attr('width', x.bandwidth());
  }

}

export default Histogram;
