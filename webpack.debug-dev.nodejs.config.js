// help: http://webpack.github.io/docs/configuration.html
// help: https://webpack.github.io/docs/webpack-dev-server.html#webpack-dev-server-cli
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const loaders = require('./webpack.loaders');
const plugins = require('./webpack.plugins');

console.log('');
console.log('DEBUG with devtools in nodeJs ');
console.log('WARNING: you should run the `npm run debug-test-build` in order to debug your latest changes!');
console.log('');

const config = {
  target: 'node', // help: https://webpack.github.io/docs/configuration.html#target
  entry: [
    // the entry application code
    path.resolve(__dirname, 'debug-dev/index.ts')
  ],
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  output: {
    path: path.resolve(__dirname, 'debug-ground/debug-dev-on-nodejs'),
    filename: 'index.js'
  },
  resolve: {
    alias: {},
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    loaders: loaders
  },
  node: {
    fs: "empty"
  },
  plugins: plugins
};

module.exports = config;
