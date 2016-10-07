const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, '../', 'app'),
  style: [
    path.join(__dirname, '../', 'app', 'main.css')
  ],
  build: path.join(__dirname, '../', 'build')
};

const common = {
  entry: {
    style: PATHS.style,
    app: PATHS.app
  },

  output: {
    path: PATHS.build,
    filename: '[name].js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Playground'
    })
  ]
};

var config;

switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge.smart(
      common,
      {
        devtool: 'source-map',
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js'
        }
      },
      parts.clean(PATHS.build),
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      parts.extractBundle({
        name: 'vendor',
        entries: ['react']
      }),
      parts.minify(),
      parts.extractCSS(PATHS.style),
      parts.purifyCSS([PATHS.app])
    );
    break;
  default:
    config = merge.smart(
      common,
      parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
      }),
      {
        devtool: 'eval-source-map'
      },
      parts.setupCSS(PATHS.style)
  );
}

module.exports = validate(config, {
  quiet: true
});

function devServer(options) {
  return {
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

      stats: 'errors-only',

      host: options.host,
      port: options.port
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};

function setupCSS(paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
          include: paths
        }
      ]
    }
  }
};

function minify() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  };
};

function setFreeVariable(key, value) {
  const env = {};

  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
};

function extractBundle(options) {
    const entry = {};

    entry[options.name] = options.entries;

    return {
      entry: entry,
      plugins: [
        new webpack.optimize.CommonsChunkPlugin({
          names: [options.name, 'manifest']
        })
      ]
    }
};

function clean(path) {
    return {
      plugins: [
        new CleanWebpackPlugin([path], {
            root: process.cwd()
        })
      ]
    };
};

function extractCSS(paths) {
  return {
      module: {
        loaders: [
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css'),
            include: paths
          }
        ]
      },
      plugins: [
        new ExtractTextPlugin('[name].[chunkhash].css')
      ]
  };
};

function purifyCSS(paths) {
  return {
    plugins: [
      new PurifyCSSPlugin({
        info: true,
        basePath: process.cwd(),
        paths: paths
      })
    ]
  };
};
