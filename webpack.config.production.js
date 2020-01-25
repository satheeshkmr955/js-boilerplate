// Imports
const path = require('path');
// const webpack = require('webpack');
// const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
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
    publicPath: '/dist',
    filename: 'bundle.js'
  },
  // Loaders
  module: {
    rules: [
      // JavaScript Files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
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
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: false
            }
          },
          // {
          //   loader: 'postcss-loader'
          // },
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/'
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: false
            }
          }
          // {
          //   loader: 'postcss-loader'
          // }
        ]
      }
    ]
  },
  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: './dist/index.html',
      filename: 'index.html',
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    })
  ],
  // Development Tools (Map Errors To Source File)
  devtool: false
};
// Exports
module.exports = config;
