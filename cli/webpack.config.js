const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, '../', 'app'),
  index: path.join(__dirname, '../', 'app', 'index.html'),
  style: [
    path.join(__dirname, '../', 'app', 'app.scss')
  ],
  build: path.join(__dirname, '../', 'build')
};

const options = {
  host: 'localhost',
  port: 8000
};

const env = process.env.NODE_ENV || 'development';
const envConfig =
  require(path.join(__dirname, '../', './cli/config', env))(PATHS, options);

var common = {
  context: PATHS.app,

  // Each key will be generated into individual chunk
  entry: {
    app: PATHS.app,
    style: PATHS.style
  },

  // Common loaders
  module: {
    //  ESLint
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        include: PATHS.app,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },

  output: {
    path: PATHS.build,
    filename: '[name].js',
    publicPath: '/'
  },

  // Common plugins
  plugins: [
    // Inject bundle file to template
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: PATHS.index,
      inject: 'body',
      xhtml: true
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env),
      }
    })
  ]
};

module.exports = validate(merge.smart(common, envConfig), {});
