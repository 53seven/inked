// histogram.js
import {default as Bivariate} from './bivariate';
import {default as Axes} from './axes';
import * as d3_scale from 'd3-scale';


class Histogram extends Bivariate {

  constructor(opts) {
    super(opts);
    var _x = d3_scale.scaleBand()
        .paddingInner(0.1);
    this.x().scale(_x);
    this._axes = new Axes(this);
  }

  plot() {
    var data = this.data();

    var x = this.x();
    x.scale().rangeRound([0, this.width()]);

    var y = this.y().range([this.height(), 0]);

    x.domain(data.map(x.val()));

    this.g().selectAll('.bar')
        .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', x.m())
        .attr('y', y.m())
        .attr('fill', this.fill())
        .attr('height', (d) => { return this.height() - y.eval(d); })
        .attr('width', x.scale().bandwidth());
  }

  decorate() {
    this._axes.plotLeft(this.y());
    this._axes.plotBottom(this.x());
  }

  fill(val) {
    if (!val) {
      return this._fill;
    }
    this._fill = val;
    return this;
  }

}

export default Histogram;
