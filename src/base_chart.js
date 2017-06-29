// base_chart.js
import * as d3_selection from 'd3-selection';
import * as d3_trans from 'd3-transition';
import * as d3 from 'd3';
import {default as MutableProp} from './mutableprop';

// we need this to stop rollup from tree shaking...
var t = d3_trans.transition().duration(500);

class BaseChart extends MutableProp {

  constructor(opts) {
    super(opts);
    this.extend(['width', 'height', 'aspect', 'fit', 'margin', 'el', 'root', 'data', 'title', 'g'], opts);
  }

  outerSize() {
    return {
      width: this.width(),
      height: this.height()
    };
  }

  innerWidth() {
    return this.width() - this.margin().left - this.margin().right;
  }

  innerHeight() {
    return this.height() - this.margin().top - this.margin().bottom;
  }

  size() {
    return {
      width: this.innerWidth(),
      height: this.innerHeight()
    };
  }

  render() {
    // base chart only needs to do one thing
    // and that is create the g element correctly
    // NOTE: no arrow function since we want the `this` (sigh)
    let rootEl;
    if (!this.root()) {
      rootEl = d3_selection.select(this.el()).append('svg');
    } else {
      rootEl = d3_selection.select(this.root());
    }

    var rootNode = rootEl.node();
    if (rootNode.parentElement && this._fit) {
      var styles = window.getComputedStyle(rootNode.parentElement);
      var padding = parseFloat(styles.paddingLeft) +
                  parseFloat(styles.paddingRight);

      this.width(rootNode.parentElement.clientWidth - padding);
      this.height(this.width() / this.aspect());
    }

    this.root(rootEl);

    this.root().attr('width', this.width())
              .attr('height', this.height());

    // capture the data on the selection
    this.g(this.root()
                .append('g')
                .attr('transform', this._translate()));

    // draw the chart title if we have one
    if (this.title()) {
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
    if (!this.g()) {
      return this.render();
    }
    // potently resize the chart
    if (this.fit()) {
      var rootNode = this.root().node();
      if (rootNode.parentElement) {
        this.width(rootNode.parentElement.clientWidth);
        this.height(this.width() / this.aspect());
        this.root().attr('width', this.width())
              .attr('height', this.height());
      }
    }
    this.plot();
    this.decorate();
    return this;
  }

  position(node, childCell, parentCell) {
    var childBB = node.getBBox();
    var parentBB = this.size();
    var x = parentBB.width - childBB.width;
    return `translate(${x}, 0)`;
  }

  one(selector, parent) {
    var elData = selector.split(/\./g);
    // creates just one element with no data
    var elem = (parent || this.g()).selectAll(selector).data([null]);
    return elem.enter()
      .append(elData.shift())
      .classed(elData.join(' '), true)
      .merge(elem);
  }

  onmousemove(fn) {
    var self = this;
    this.root().on('mousemove', function(d, i) {
      var mouse = d3.mouse(this);
      var margin = self.margin();
      var size = self.size();
      var coords = {
        x: Math.min(Math.max(mouse[0] - margin.left, 0), size.width),
        y: Math.min(Math.max(mouse[1] - margin.top, 0), size.width)
      };
      fn.call(self, coords);
    });
  }

  onmouseout(fn) {
    var self = this;
    this.root().on('mouseout', function(d, i) {
      fn.call(self);
    });
  }

  // utility function to hide the kludge
  _translate() {
    return 'translate(' + this.margin().left + ',' + this.margin().top + ')';
  }
}

export default BaseChart;
