const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, './client/public');
const APP_DIR = path.resolve(__dirname, './client');

const config = {
  devtool: '#eval-source-map',
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel',
        query:{
          presets:['react', 'es2015']
        }
      }
    ]
  }
 };

module.exports = config;