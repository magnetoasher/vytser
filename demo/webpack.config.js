const path = require('path');
const webpack = require('webpack');
const vueLoaderConfig = require('./vue-loader.config')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  context: __dirname,
  devtool: '#inline-source-map',
  entry: ['./index.tsx'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/build/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.vue'],
    alias: {
      vytser: path.resolve(__dirname, '../packages/vytser/src/index'),
      'vytser-react': path.resolve(__dirname, '../packages/vytser-react/src/index'),
      'vytser-vue': path.resolve(__dirname, '../packages/vytser-vue/src/index'),
      'vytser-ng': path.resolve(__dirname, '../packages/vytser-ng/src/index'),
      'vytser-cell-vue': path.resolve(__dirname, '../packages/vytser-cell-vue/src/index'),
      'vytser-cell': path.resolve(__dirname, '../packages/vytser-cell/src/index'),
      'vytser-graph': path.resolve(__dirname, '../packages/vytser-graph/src/index'),
      'vytser-graph-ng': path.resolve(__dirname, '../packages/vytser-graph-ng/src/index'),
      'vue$': 'vue/dist/vue.esm.js'
    },
    modules: [
      path.resolve(__dirname, '../packages/vytser-ng/node_modules'), 'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new VueLoaderPlugin()
  ]
};
