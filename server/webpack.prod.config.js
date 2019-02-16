const config = require('./webpack.config.js');

const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

console.info('loading webpack production environment - server');

module.exports = () => {
  config.mode = 'production';
  config.devtool = 'hidden-source-map';
  config.optimization = {
    minimizer: [
      new TerserWebpackPlugin(),
    ],
  };
  config.plugins = [
    // /* Delete Distribution before building it */
    new CleanWebpackPlugin(['flickr/server.js'], { root: path.resolve(__dirname, '..') }),
    new CopyWebpackPlugin([
      { from: 'server/config.json', to: '../flickr/' },
    ]),
  ];
  return config;
};
