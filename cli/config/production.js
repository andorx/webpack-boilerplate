const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(PATHS, options) {
  return {
    devtool: 'source-map',

    entry: {
      'vendor': [
        'react',
        'react-dom',
        'react-router',
        'react-redux',
        'redux',
        'redux-thunk',
        'isomorphic-fetch',
        'lodash',
        'material-design-lite'
      ]
    },

    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },

    module: {
      loaders: [
        {
          test: /\.scss$/,
          // https://github.com/webpack/extract-text-webpack-plugin/issues/209
          loader: ExtractTextPlugin.extract('style', 'css!sass'),
          include: PATHS.style
        }
      ]
    },

    plugins: [
      new CleanWebpackPlugin([PATHS.build], {
          root: process.cwd()
      }),
      new ExtractTextPlugin('[name].[chunkhash].css'),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new PurifyCSSPlugin({
        info: true,
        basePath: process.cwd(),
        paths: [PATHS.app]
      })
    ]
  };
};
