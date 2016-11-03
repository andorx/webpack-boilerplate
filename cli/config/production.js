const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(PATHS, options) {
  const pkg = require(PATHS.package);

  return {
    devtool: 'source-map',

    // Append vendor to entry chunks
    entry: {
      vendor: Object.keys(pkg.dependencies)
    },

    output: {
      filename: '[name].[chunkhash:6].js',
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
