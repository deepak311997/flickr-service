const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: 'app.js',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    path: path.join(__dirname, '../flickr/'),
    publicPath: '/',
    filename: 'server.js',
  },
  resolve: {
    modules: ['node_modules', 'server'],
  },
  plugins: [
    new CleanWebpackPlugin(['flickr/server.js'], { root: path.resolve(__dirname, '..') }),
  ],
};
