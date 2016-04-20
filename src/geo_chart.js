// geo_chart.js
import {default as BaseChart} from './base_chart';
import * as d3_geo_projection from 'd3-geo-projection';
import * as topojson from 'topojson';

class GeoChart extends BaseChart {

  constructor(opts) {
    super(opts);
    this._projection = 'albers';
    this._scale = 1000;
    this._topo = null;
  }

  plot(data) {
    var path = d3.geo.path()
      .projection(this._projection);

    this.g()
      .selectAll('path')
        .data(topojson.feature(this._topo).features)
      .enter().append('path')
        .attr('d', path);
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
export default GeoChart;
