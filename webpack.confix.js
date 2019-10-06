const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './assets/js/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.jsx?/i,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
        // {
        //   test: /\.css$/,
        //   use: ['style-loader', 'css-loader'],
        //   exclude: /node_modules/,
        // }
      ]},
      watch: true,
      devServer: {
        publicPath: '/build',
        proxy: {
          '/login':'http://localhost:3333',
          '/secret': 'http://localhost:3333',
          '/task': 'http://localhost:3333'
        }
      },
      resolve: {
        extensions: ['*','.js'],
      }
  };