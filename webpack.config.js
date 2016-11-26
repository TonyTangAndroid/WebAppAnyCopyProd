var path = require('path');
var webpack = require('webpack');

module.exports = {
    debug: true,
    entry: "./app/scripts/index.js",
    output: {
      path: path.join(__dirname, "docs"),
      publicPath: "docs/",
      filename: "bundle.js",
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      }]
    },
    resolve: {
      alias: {
        jQuery: "/node_modules/jquery/src/jquery.js"
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      })
    ]
  }
