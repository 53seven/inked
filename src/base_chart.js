// base_chart.js
import * as d3_selection from 'd3-selection';
class BaseChart {

  constructor(opts) {
    opts = opts || {};
    this._width = opts.width || 0;
    this._height = opts.height || 0;
    this._margin = opts.margin || {top: 0, left:0, bottom: 0, right: 0};
  }

  width(val) {
    if (!val) {
      return this._width;
    }
    this._width = val;
    return this;
  }

  height(val) {
    if (!val) {
      return this._height;
    }
    this._height = val;
    return this;
  }

  innerWidth() {
    return this._width - this._margin.left - this._margin.right;
  }

  innerHeight() {
    return this._height - this._margin.top - this._margin.bottom;
  }

  margin(val) {
    if (!val) {
      return this._margin;
    }
    this._margin.top = val.top;
    this._margin.bottom = val.bottom;
    this._margin.left = val.left;
    this._margin.right = val.right;
    return this;
  }

  g() {
    return this._g;
  }

  data() {
    return this._data;
  }

  render(svg) {
    // base chart only needs to do one thing
    // and that is create the g element correctly
    // NOTE: no arrow function since we want the `this` (sigh)
    var self = this;
    svg.call((selection) => {
      selection.each(function(data) {
        // capture the data on the selection
        self._data = data;
        self._g = d3_selection.select(this)
                  .append('g')
                  .attr('transform', 'translate(' + self.margin().left + ',' + self.margin().top + ')');
        self.plot(data);
      });
    });
  }

  update(svg) {
    var self = this;
    svg.call((selection) => {
      selection.each(function(data) {
        // capture the data on the selection
        self._data = data;
        this._g = d3_selection.select(this).select('g');

        self.plot(data);
      });
    });
  }
}

export default BaseChart;