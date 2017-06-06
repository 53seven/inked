// pathTween.js
// path tweening util
// Based on Mike's example found here:
// https://bl.ocks.org/mbostock/3916621
import * as d3_interpolate from 'd3-interpolate';

function pathTween(new_path, precision) {
    return function(data) {
      var path0 = this,
          path1 = path0.cloneNode(),
          n0 = path0.getTotalLength(),
          n1 = (path1.setAttribute('d', new_path(data)), path1).getTotalLength();

      // Uniform sampling of distance based on specified precision.
      // todo: change from uniform sampling to one that biases parts of path with high rate of change
      var distances = [0], i = 0, dt = precision / Math.max(n0, n1);
      while ((i += dt) < 1) {
        distances.push(i);
      }
      distances.push(1);

      // Compute point-interpolators at each distance.
      var points = distances.map(function(t) {
        var p0 = path0.getPointAtLength(t * n0),
            p1 = path1.getPointAtLength(t * n1);
        return d3_interpolate.interpolateArray([p0.x, p0.y], [p1.x, p1.y]);
      });

      return function(t) {
        return t < 1 ? 'M' + points.map(function(p) { return p(t); }).join('L') : new_path(data);
      };
    };
  }

export default pathTween;
