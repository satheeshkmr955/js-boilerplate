// Imports
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('babel-register');
// Webpack Configuration
const config = {
  // Entry
  entry: ['./src/index.js', './src/index.css'],

  // Output
  output: {
    path: path.join(__dirname, './dist/'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  // Loaders
  module: {
    rules: [
      // JavaScript/JSX Files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // presets: ['env'],
              // plugins: [
              //   [
              //     'transform-runtime',
              //     {
              //       polyfill: true,
              //       regenerator: true
              //     }
              //   ]
              // ]
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: false
                  }
                ]
              ],
              plugins: [
                '@babel/plugin-transform-runtime',
                '@babel/plugin-proposal-class-properties'
              ]
            }
          }
        ]
      },
      // SCSS Files
      {
        test: /\.scss$/,
        use: [
          { loader: 'raw-loader' },
          {
            loader: 'style-loader'
          },
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      // CSS Files
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css'
    })
  ],
  // OPTIONAL
  // Reload On File Change
  watch: true,
  // Development Tools (Map Errors To Source File)
  devtool: 'source-map'
};
// Exports
module.exports = config;
