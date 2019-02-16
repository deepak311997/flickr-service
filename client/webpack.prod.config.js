const config = require('./webpack.config.js');

const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

console.info('loading webpack production environment');

module.exports = (env = {}) => {
  const isDev = env.isDev;

  config.mode = 'production';
  config.devtool = isDev ? 'cheap-module-source-map' : '';
  config.optimization = {
    minimizer: [
      new TerserWebpackPlugin({
        sourceMap: isDev,
      }),
    ],
    splitChunks: {
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].bundle.[hash].js',
    },
  };
  config.output = {
    path: path.resolve(__dirname, '../flickr/client-bundles'),
    filename: '[name].bundle.[hash].js',
    publicPath: '/',
  };
  config.plugins = [
    // /* Delete Distribution before building it */
    new CleanWebpackPlugin(['flickr/client-bundles'], { root: path.resolve(__dirname, '..') }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin([
      { from: 'src/app-config.js', to: '.' },
      { from: 'build/locales', to: 'locales/' },
      { from: 'src/pwa/manifest.json', to: './' },
    ]),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // Code splitting
    new MiniCssExtractPlugin({
      filename: 'bundle.[hash].css',
    }),
    // Ignore locales from momentJS
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ];

  return config;
};
