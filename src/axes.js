// axes.js
// utility class to make drawing chart axes easier
import * as d3_axis from 'd3-axis';

class Axes {

  constructor(parent) {
    this._parent = parent;
  }

  plotLeft(measure) {
    var axis = d3_axis.axisLeft().scale(measure.scale());
    if (!this._left_axis) {
      this._left_axis = this._parent.g()
                          .append('g')
                          .attr('class', 'left axis');

      this._left_axis.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text(this.leftAxisLabel());
      this._left_axis.call(axis);
    } else {
      this._left_axis.transition().call(axis);
    }

  }

  leftAxis() {
    return this._left_axis;
  }

  leftAxisLabel(val) {
    if (!val) {
      return this._left_axis_label;
    }
    this._left_axis_label = val;
    return this;
  }

  plotBottom(measure) {
    if (this._bottom_axis) {
      this._bottom_axis.remove();
    }

    var axis = d3_axis.axisBottom().scale(measure.scale());
    this._bottom_axis = this._parent.g().append('g')
        .attr('class', 'bottom axis')
        .attr('transform', 'translate(0,' + this._parent.height() + ')')
        .call(axis);
  }

  bottomAxis() {
    return this._bottom_axis;
  }

  bottomAxisLabel(val) {
    if (!val) {
      return this._bottom_axis_label;
    }
    this._left_axis_label = val;
    return this;
  }


}

export default Axes;
