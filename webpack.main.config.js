var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');

var config = module.exports = {
  context: __dirname,
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    './app/index.jsx',
  ],
};

config.cache = true;
config.output = {
  path: path.join(__dirname, 'public', 'assets'),
  filename: 'app.js',
  publicPath: '/assets',
};

config.resolve = {
  // tell webpack which extensions to auto search when it resolves modules. With this,
  // you'll be able to do `require('./utils')` instead of `require('./utils.js')`
  extensions: ['', '.js', '.jsx'],
  // by default, webpack will search in `web_modules` and `node_modules`. Because we're using
  // Bower, we want it to look in there too
  modulesDirectories: ['node_modules', 'bower_components'],

  // Alias
  // We may want to create aliases for all our bundles
  // http://webpack.github.io/docs/configuration.html#resolve-alias
  alias: {
    assets: path.join(__dirname, 'app', 'assets'),
  },
};

config.plugins = [
  // we need this plugin to teach webpack how to find module entry points for bower files,
  // as these may not have a package.json file
  new webpack.ResolverPlugin([
    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
  ]),
  new WebpackNotifierPlugin(),
  //new webpack.optimize.CommonsChunkPlugin('common-bundle.js'),
];

var commonExclude = [/bower_components/, /node_modules/];
var autoprefixerLoader = 'autoprefixer?browsers=last 2 version';
config.module = {
  loaders: [
    { test: /\.(js|jsx)$/,  //All .js and .jsx files
      loaders: ['react-hot','babel-loader'],
      exclude: commonExclude
    },
    { test: /\.css$/, loaders: ['style?sourceMap', 'css', autoprefixerLoader] },
    { test: /\.styl$/, loaders: ['style?sourceMap', 'css', autoprefixerLoader, 'stylus'] },
    { test: /\.html$/, loader: 'raw-loader', exclude: commonExclude },
  ],
};
