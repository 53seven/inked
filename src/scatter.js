// histogram.js
import {default as Bivariate} from './bivariate';
import {default as Axes} from './axes';

class ScatterChart extends Bivariate {

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

    x.fit(data);
    y.fit(data);

    var circles = this.g().selectAll('circle.point').data(data);

    circles.enter()
        .append('circle').attr('class', 'point')
        .attr('r', this.r())
        .attr('fill', this.fill())
        .attr('cx', x.m())
        .attr('cy', y.m());


    circles.transition()
        .attr('r', this.r())
        .attr('fill', this.fill())
        .attr('cx', x.m())
        .attr('cy', y.m());
  }

  decorate() {
    this._axes.plotLeft(this.y());
    this._axes.plotBottom(this.x());
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
      return this._fill;
    }
    this._fill = val;
    return this;
  }

}

export default ScatterChart;
