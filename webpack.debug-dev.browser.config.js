// help: http://webpack.github.io/docs/configuration.html
// help: https://webpack.github.io/docs/webpack-dev-server.html#webpack-dev-server-cli
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const loaders = require('./webpack.loaders');
const plugins = require('./webpack.plugins');
const getFiles = require('./utils/getAllFiles');

const config = {
  target: 'web', // help: https://webpack.github.io/docs/configuration.html#target
  entry: genEntry(),
  output: {
    path: path.resolve(__dirname, 'debug-ground/debug-dev-on-browser'),
    filename: '[name].js'
  },
  externals: [{
    three: 'THREE',
  }],
  resolve: {
    alias: {},
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    loaders: loaders
  },
  node: {
    // universal app? place here your conditional imports for node env
    fs: "empty",
    path: "empty",
    child_process: "empty",
  },
  plugins: plugins,
};

function  genEntry() {
  const entryFiles = getFiles('debug-dev', /debug-dev\/[\w-]+\.ts$/);
  let entry = {};
  entryFiles.map(file => {
    entry = Object.assign(entry, {
      [file]: path.resolve(__dirname, `debug-dev/${file}.ts`)
    });
  });
  return entry;
}

module.exports = config;
