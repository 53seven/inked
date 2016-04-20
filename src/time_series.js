// time_series.js
// a line chart where x is a measure of time
import {default as LineChart} from './line_chart';
import {max as d3_max, extent as d3_extent} from 'd3-array';
import * as d3_scale from 'd3-scale';
import * as d3_axis from 'd3-axis';

class TimeSeries extends LineChart {

  constructor(opts) {
    super(opts);
    // set the scales for the chart
    this.x(d3_scale.scaleTime());
    this.y(d3_scale.scaleLinear());
  }

  plot(data) {
    this.x().range([0, this.innerWidth()]);
    this.y().range([this.innerHeight(), 0]);
    // figure out the domains for our data (if they have not been set)
    if (!this._x_domain) {
      this._x_domain = d3_extent(data, this.xVal());
    }
    if (!this._y_domain) {
      this._y_domain = [0, d3_max(data, this.yVal())];
    }

    // set our scale domains
    this.x().domain(this._x_domain);
    this.y().domain(this._y_domain);

    // draw our line
    super.plot(data);

    var xAxis = d3_axis.axisBottom().scale(this.x());
    var yAxis = d3_axis.axisLeft().scale(this.y());

    // add the axis
    this.g().append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + this.innerHeight() + ')')
          .call(xAxis);

    this.g().append('g')
          .attr('class', 'y axis')
          .call(yAxis);
  }

  xDomain(val) {
    if (!val) {
      return this._x_domain;
    }
    this._x_domain = val;
    return this;
  }

  yDomain(val) {
    if (!val) {
      return this._y_domain;
    }
    this._y_domain = val;
    return this;
  }

}

export default TimeSeries;
