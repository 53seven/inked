// cord_chart.js
// geo_chart.js
import {default as BaseChart} from './base_chart';
import * as d3_chord from 'd3-chord';

class ChordChart extends BaseChart {

  constructor(opts) {
    super(opts);

  }

  plot(data) {

  }

  projection(val) {
    if (!val) {
      return this._projection;
    }
    this._projection = val;
    return this;
  }

  scale(val) {
    if (!val) {
      return this._scale;
    }
    this._scale = val;
    return this;
  }

  topo(val) {
    if (!val) {
      return this._topo;
    }
    this._topo = val;
    return this;
  }


}
export default ChordChart;
