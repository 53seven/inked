import npm from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.js',
  plugins: [npm({jsnext: true})],
  moduleId: '537-base-chart',
  moduleName: '$537',
  format: 'umd'
};