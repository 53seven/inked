import npm from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'index.js',
  plugins: [npm({jsnext: true}), commonjs({})],
  moduleId: '537-base-chart',
  moduleName: '$537',
  format: 'umd'
};