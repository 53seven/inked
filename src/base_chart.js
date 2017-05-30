// base_chart.js
import * as d3_selection from 'd3-selection';
import * as d3_trans from 'd3-transition';

// we need this to stop rollup from tree shaking...
var t = d3_trans.transition().duration(500);

class BaseChart {

  constructor(opts) {
    opts = opts || {};
    this._width = opts.width || 0;
    this._height = opts.height || 0;
    this._margin = opts.margin || {top: 0, left:0, bottom: 0, right: 0};
    this._el = opts.el || 'body';
    this._root = opts.root || null;
    this._data = opts.data || null;
    this._title = opts.title || null;
  }

  outerWidth(val) {
    if (!val) {
      return this._width;
    }
    this._width = val;
    return this;
  }

  outerHeight(val) {
    if (!val) {
      return this._height;
    }
    this._height = val;
    return this;
  }

  outerSize() {
    return {
      width: this.outerWidth(),
      height: this.outerHeight()
    };
  }

  width() {
    return this._width - this._margin.left - this._margin.right;
  }

  height() {
    return this._height - this._margin.top - this._margin.bottom;
  }

  size() {
    return {
      width: this.width(),
      height: this.height()
    };
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

  root() {
    return this._root;
  }

  title(val) {
    if (!val) {
      return this._title;
    }
    this._title = val;
    return this;
  }

  data(val) {
    if (!val) {
      return this._data;
    }
    this._data = val;
    return this;
  }

  render() {
    // base chart only needs to do one thing
    // and that is create the g element correctly
    // NOTE: no arrow function since we want the `this` (sigh)
    if (!this._root) {
      this._root = d3_selection.select(this._el)
                        .append('svg')
                        .attr('width', this.outerWidth())
                        .attr('height', this.outerHeight());
    } else {
      this._root = d3_selection.select(this._root);
    }

    // capture the data on the selection
    this._g = this._root
                .append('g')
                .attr('transform', this._translate());

    // draw the chart title if we have one
    if (this._title) {
      this.g()
        .append('text')
        .attr('class', 'title')
        .attr('dy', '-0.35em')
        .text(this.title());
    }

    // plot should draw/update the data
    this.plot();
    // and decorate should draw/update non data elements (such as axes)
    this.decorate();
    return this;
  }

  update() {
    this.plot();
    this.decorate();
    return this;
  }

  // utility function to hide the kludge
  _translate() {
    return 'translate(' + this.margin().left + ',' + this.margin().top + ')';
  }
}

export default BaseChart;