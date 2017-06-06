// line_chart.js
import {default as Bivariate} from './bivariate';
import {default as Axes} from './axes';
import {default as pathTween} from './util/pathTween';
import * as d3 from 'd3';
import * as _ from 'lodash-es';

class LineChart extends Bivariate {

  constructor(opts) {
    super(opts);
    this._axes = new Axes(this);
    this._stroke = (d,i) => {
      return d3.schemeCategory20[i];
    };
  }

  plot() {
    var data = this.data();

    // check to see if there are multiple series of data
    if (!Array.isArray(data[0])) {
      data = [data];
    }

    // flatten the data so that we can have the scales line up
    var flat_data = _.flatten(data);

    var x = this.x();
    x.range([0, this.width()]);
    x.fit(flat_data);

    var y = this.y();
    y.range([this.height(), 0]);
    y.fit(flat_data);

    var line = d3.line()
        .x(x.m())
        .y(y.m())
        .curve(d3.curveCatmullRom.alpha(0.5));

    // now draw a path for each series in the data
    var path = this.g().selectAll('path.line')
        .data(data);

    path.enter().append('path')
        .attr('d', line)
        .attr('class', 'line')
        .style('stroke', this.stroke());


    path.transition()
        .duration(1000)
        .attr('d', line)
        .attrTween('d', pathTween(line, 25));

    var labels;
    if (this._label) {
      labels = this.g().selectAll('text.labels').data(data, (d, i) => { return i; });

      labels.exit().remove();
      labels.enter()
          .append('text')
          .attr('class', 'labels')
          .attr('x', (d, i) => {
            return x.m()(_.last(d));
          })
          .attr('y', (d, i) => {
            return y.m()(_.last(d));
          })
        .merge(labels)
          .transition()
          .attr('x', (d, i) => {
            return x.m()(_.last(d));
          })
          .attr('y', (d, i) => {
            return y.m()(_.last(d));
          })
          .attr('dx', '0.5em')
          .text(this._label);

    }

    this.onmousemove((coords) => {
      var hoverX = this.x().scale().invert(coords.x);
      var bLeft = d3.bisector(this.xVal()).left;
      var bRight = d3.bisector(this.xVal()).right;
      // get the dots we want to draw
      var hoveredDots = data.map((d) => {
        var iLeft = bLeft(d, hoverX, 1),
          iRight = bRight(d, hoverX, 1),
          d0 = d[iLeft - 1],
          d1 = d[iRight],
          point = hoverX - x.eval(d0) > x.eval(d1) - hoverX ? d1 : d0;
        return point;
      });

      var dots = this.g().selectAll('circle.point').data(hoveredDots);
      dots.exit().remove();
      dots.enter().append('circle')
          .attr('class', 'point')
          .attr('r', 5)
        .merge(dots)
          .attr('cx', x.m())
          .attr('cy', y.m())
          .attr('fill', this.stroke());

      // now draw the trace line
      var trace = this.g().selectAll('line.trace').data([{x: hoverX}]);
      trace.enter()
          .append('line').attr('class', 'trace')
        .merge(trace)
          .attr('x1', (d) => {
            return x.scale()(d.x);
          })
          .attr('x2', (d) => {
            return x.scale()(d.x);
          })
          .attr('y1', 0)
          .attr('y2', this.height());

      // finally draw annotation box
      var annotationText = this.g().selectAll('text.annotation').data(hoveredDots);
      annotationText.exit().remove();
      annotationText.enter().append('text')
          .attr('class', 'annotation')
        .merge(annotationText)
          .attr('x', (d) => {
            return x.scale()(hoverX);
          })
          .attr('dx', '5px')
          .attr('y', 0)
          .attr('dy', (d, i) => {
            return `${i}em`;
          })
          .text((d, i) => {
            if (this._label) {
              return [this._label(d, i), y.val()(d, i)].join(' - ');
            } else {
              return y.val()(d, i);
            }

          });
    });
  }

  label(val) {
    if (!val) {
      return this._label;
    }
    this._label = typeof val === 'string' ? function(d) { return _.at(d, val)[0]; } : val;
    return this;
  }

  stroke(val) {
    if (!val) {
      return this._stroke;
    }
    this._stroke = val;
    return this;
  }

  decorate() {
    this._axes.plotLeft(this.y());
    this._axes.plotBottom(this.x());
  }

}
export default LineChart;
