// grouped_histogram.js
// a histogram that has several rectangles in the same bucket
import {default as Histogram} from './histogram';

class GroupedHistogram extends Histogram {

  constructor(opts) {
    super(opts);
  }

  plot() {
    var data = this.data();

    var x = this.x();
    x.scale().rangeRound([0, this.width()]);

    var y = this.y().range([this.height(), 0]);

    x.domain(data.map(x.val()));

    var group = this.group();
    group.domain(data.map(group.val()));
    group.scale().rangeRound([0, x.scale().bandwidth()]);

    this.g().selectAll('.bar')
        .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d, i) => { return x.eval(d, i) + group.eval(d, i); })
        .attr('y', y.m())
        .attr('fill', this.fill())
        .attr('height', (d) => { return this.height() - y.eval(d); })
        .attr('width', group.scale().bandwidth());
  }

  // characteristic function to determine a data's group
  group(val) {
    if (!val) {
      return this._group;
    }
    this._group = val;
    return this;
  }

}

export default GroupedHistogram;
