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

}

export default TimeSeries;
