const path = require('path');
const webpack = require('webpack');
const env = process.env.NODE_ENV;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let config = {
  mode: 'production',

  entry: './lib/index',

  output: {
    path: path.resolve(__dirname, 'umd'),
    filename: 'vytser-graph-vue.min.js',
    library: 'VytserGraphVue',
    libraryTarget: 'umd',
  },

  resolve: {
    extensions: ['.js', '.json'],
  },

  externals: {
    'vue': 'Vue',
  },

  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }],
  },

  plugins: [],
};

if (env === 'analyse') {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
