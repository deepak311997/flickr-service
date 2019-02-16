const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  context: path.resolve(__dirname, '../client'),
  entry: {
    app: './src/index.js',
    vendor: [
      'axios',
      'babel-polyfill',
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
    ],
  },
  resolve: {
    modules: ['../node_modules', 'src'],
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: { presets: ['es2015', 'react', 'stage-2'] },
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'resolve-url-loader',
          'sass-loader?sourceMap',
        ],
      },
      {
        test: /\.(ttf|eot|woff2?)(\?v=[a-z0-9=\.]+)?$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '../client-bundles'),
    filename: '[name].bundle.[hash].js',
    publicPath: '/',
  },
  plugins: [
    // /* Delete Distribution before building it */
    new CleanWebpackPlugin(['client-bundles'], { root: path.resolve(__dirname, '..') }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin([
      { from: 'src/app-config.js', to: './' },
      { from: 'build/locales', to: 'locales/' },
      { from: 'src/pwa/manifest.json', to: './' },
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // Code splitting
    new MiniCssExtractPlugin({
      filename: 'bundle.[hash].css',
    }),
    // Ignore locales from momentJS
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Watch translation files
  ],
  optimization: {
    // automatically split chunks
    splitChunks: {
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].bundle.[hash].js',
    },
  },
};
