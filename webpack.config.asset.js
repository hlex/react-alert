var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // devtool: 'source-map',
  // entry: './app/index.js',
  entry: {
    style: [
      path.join(__dirname, 'src/style.scss'),
    ],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'style.css',
  },

  plugins: [
    new ExtractTextPlugin('[name].css', {
      allChunks: true,
    }),
  ],
  module: {
    loaders: [
      { test: /\.scss$/, loader: ExtractTextPlugin.extract(['css', 'sass?outputStyle=compressed']) },
    ],
  },
}
