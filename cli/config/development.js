const webpack = require('webpack');

module.exports = function(PATHS, options) {
  return {
    devtool: 'eval-source-map',

    module: {
      loaders: [
        {
          test: /\.scss$/,
          loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
          include: PATHS.style
        }
      ]
    },

    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },

    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups
      historyApiFallback: true,

      // Unlike CLI flag, this doesn't set HotModuleReplacementPlugin
      hot: true,
      inline: true,
      open: true,

      stats: 'errors-only',

      host: options.host,
      port: options.port
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};
