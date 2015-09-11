var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var webpackConfig = require('./webpack.config.js');

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

var compiler = webpack(webpackConfig);
var server = new WebpackDevServer(compiler, {
  contentBase: webpackConfig.output.path,
  filename:    webpackConfig.output.filename,
  host:        'localhost',
  hot:         true,
  inline:      true,
  cache: true,
  progress:    true,
  publicPath:  webpackConfig.output.publicPath,
  stats:       { colors: true },
  proxy: {
    // Proxy requests to local node process
    "*": "http://localhost:3008"
  },
  //proxy:       [{
  //    // proxy all requests not containing ".hot-update.js"
  //    // regex is still crappy because JS doesn't have negative lookbehind
  //    //path:    /^(?!.*\.hot-update\.js)(.*)$/, 
  //    path: '*',
  //    // koa running on 3001 with koa-send and isomorphic react
  //    //target:  'http://localhost:3001/'
  //    target:  'http://localhost:31016/'
  //}]
});

server.listen(3009, "", function() {});
