// time_series.js
// a line chart where x is a measure of time
import {default as LineChart} from './line_chart';
import * as d3_scale from 'd3-scale';

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
  }
}

export default TimeSeries;
