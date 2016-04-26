// histogram.js
import {default as Bivariate} from './bivariate';
import {default as Measure} from './measure';
import * as d3_array from 'd3-array';
import * as d3_scale from 'd3-scale';
import * as d3_axis from 'd3-axis';

class Histogram extends Bivariate {

  constructor(opts) {
    super(opts);
  }

  plot() {
    var data = this.data();

    var _x = d3_scale.scaleBand()
        .rangeRound([0, this.width()])
        .paddingInner(0.1);
    this.x().scale(_x);
    var x = this.x();

    var y = this.y().range([this.height(), 0]);

    var xAxis = d3_axis.axisBottom()
        .scale(x.scale());

    var yAxis = d3_axis.axisLeft()
        .scale(y.scale());


    x.domain(data.map(x.val()));

    console.log(y.m())

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
        .attr('x', x.m())
        .attr('y', y.m())
        .attr('height', (d) => { return this.height() - y.m()(d); })
        .attr('width', x.scale().bandwidth());
  }

}

export default Histogram;
