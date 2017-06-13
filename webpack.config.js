/* eslint-disable */
'use strict';

var webpack = require('webpack');
var path = require('path');

var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];
console.log(process.env.NODE_ENV);
var DEV_MODE = process.env.NODE_ENV !== 'production';

if (!DEV_MODE) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  );
}

module.exports = {
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [{
        loader: 'babel-loader',
      }],
      exclude: /node_modules/
    },{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }]
  },

  entry: {
    app: './docs/app.js',
  },

  watch: DEV_MODE,
  devtool: DEV_MODE ? 'inline-source-map' : 'source-map',

  output: {
    path: path.join(__dirname, 'docs/js/'),
    filename: 'bundle.min.js',
    publicPath: '/js/'
  },

  plugins: plugins,
  resolve: {
    extensions: ['.js', '.json']
  }
};
