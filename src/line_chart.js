// line_chart.js
import {default as Bivariate} from './bivariate';
import {default as Axes} from './axes';
import {default as pathTween} from './util/pathTween';
import * as d3 from 'd3';
import * as _ from 'lodash-es';

class LineChart extends Bivariate {

  constructor(opts) {
    super(opts);
    opts.stroke = opts.stroke || ((d,i) => {
      return d3.schemeCategory20[i];
    });
    this.extend({
      'label': 'path',
      'stroke': 'simple'
    }, opts);
    this._axes = new Axes(this);
  }

  plot() {
    var self = this;
    var data = this.data();

    // check to see if there are multiple series of data
    if (!Array.isArray(data[0])) {
      data = [data];
    }

    // flatten the data so that we can have the scales line up
    var flat_data = _.flatten(data);

    var size = this.size();
    var x = this.x();
    x.range([0, size.width]);
    x.fit(flat_data);

    var y = this.y();
    y.range([size.height, 0]);
    y.fit(flat_data);

    var line_path = d3.line()
        .x(x.m())
        .y(y.m())
        .curve(d3.curveCatmullRom.alpha(0.5));

    // now draw a path for each series in the data
    var path = this.g().selectAll('path.line')
        .data(data);

    path.enter().append('path')
        .attr('d', line_path)
        .attr('class', 'line')
        .style('stroke', this.stroke());


    path.transition()
        .duration(1000)
        .attr('d', line_path)
        .attrTween('d', pathTween(line_path, 25));

    if (this._label) {
      var labelContainer = this.one('g.labelContainer');
      var labelsG = labelContainer.selectAll('g.label').data(data, (d, i) => { return i; });

      var newLabels = labelsG.enter().append('g')
        .classed('label', true)
        .attr('transform', (d, i) => {
          return `translate(0, ${i*15})`;
        });

      var circles = newLabels.append('circle').attr('r', '0.5em');
      var labels = newLabels.append('text').text(this._label);

      circles
        .attr('cx', '0.25em')
        .attr('cy', '0.25em')
        .style('fill', this.stroke());

      labels
        .attr('x', '0.9em')
        .attr('dy', '0.5em');

      labelContainer.attr('transform', function(d, i, nodes, n) {
        return self.position(this, 'NE', 'NE');
      });
    }

    var annotationContainer = this.one('g.annotationContainer')
      .style('pointer-events', 'none');

    this.onmousemove((coords) => {
      var hoverX = this.x().scale().invert(coords.x);
      var bisect = d3.bisector(this.x_val()).right;
      // get the dots we want to draw
      var hoveredDots = data.map((d) => {
        var index = bisect(d, hoverX, 1),
          d0 = d[index - 1],
          d1 = d[index],
          point = hoverX - x.val()(d1) > x.val()(d0) - hoverX ? d1 : d0;
        return point;
      });

      var dots = annotationContainer.selectAll('circle.point').data(hoveredDots);
      dots.exit().remove();
      dots.enter().append('circle')
          .attr('class', 'point')
          .attr('r', 5)
        .merge(dots)
          .attr('cx', x.m())
          .attr('cy', y.m())
          .attr('fill', this.stroke());

      // now draw the trace line
      var trace = annotationContainer.selectAll('line.trace').data([{x: hoverX}]);
      trace.enter()
          .append('line').attr('class', 'trace')
          .style('pointer-events', 'none')
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
      var textContainer = this.one('g.textContainer', annotationContainer);
      var annotationText = textContainer.selectAll('text.annotation').data(hoveredDots);
      annotationText.exit().remove();
      annotationText.enter().append('text')
          .attr('class', 'annotation')
        .merge(annotationText)
          .attr('dx', '15px')
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

      textContainer.attr('transform', function(d) {
        var box = this.getBBox();
        var size = self.size();
        var transx = x.scale()(hoverX);
        if (transx + box.width > size.width) {
          transx -= (box.width + 30);
        }
        return `translate(${transx}, ${coords.y})`;
      });
    });

    this.onmouseout(() => {
      annotationContainer.selectAll('*').remove();
    });
  }

  decorate() {
    this._axes.plotLeft(this.y());
    this._axes.plotBottom(this.x());
  }

}
export default LineChart;
