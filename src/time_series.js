// time_series.js
// a line chart where x is a measure of time
import {default as LineChart} from './line_chart';
import * as d3_scale from 'd3-scale';
import * as d3_axis from 'd3-axis';

class TimeSeries extends LineChart {

  constructor(opts) {
    super(opts);
    // set the scales for the chart
    this.x().scale(d3_scale.scaleTime());
  }

  plot() {
    var data = this.data();
    this.x().range([0, this.width()]);
    this.y().range([this.height(), 0]);
    // figure out the domains for our data (if they have not been set)

    this.x().fit(data);
    this.y().fit(data);

    // draw our line
    super.plot();

    var xAxis = d3_axis.axisBottom().scale(this.x().scale());
    var yAxis = d3_axis.axisLeft().scale(this.y().scale());

    // add the axis
    this.g().append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + this.height() + ')')
          .call(xAxis);

    this.g().append('g')
          .attr('class', 'y axis')
          .call(yAxis);
  }
}

export default TimeSeries;
