// This is the development webpack config
var webpack = require('webpack');
var _ = require('lodash');
var config = module.exports = require('./webpack.main.config.js');

config = _.merge(config, {
  debug: true,
  displayErrorDetails: true,
  outputPathinfo: true,

  // Source map configuration (has a big impact on rebuild performance)
  // http://webpack.github.io/docs/configuration.html#devtool
  // Eval source maps (fast)
  //devtool: 'cheap-module-eval-source-map',
  // Cheap source maps (medium)
  devtool: 'cheap-module-source-map',
  // Production-value source maps (slow)
  //devtool: 'source-map',
});
