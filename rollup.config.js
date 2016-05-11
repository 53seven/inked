import npm from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.js',
  plugins: [npm({jsnext: true})],
  moduleId: 'nought',
  moduleName: 'nought',
  format: 'umd'
};