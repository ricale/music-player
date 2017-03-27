const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  devServer: {
  },
  devtool: "cheap-eval-source-map",
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new ProgressBarPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        use: [{
          loader: 'babel-loader',
          options: {presets: ['react', 'es2015', 'stage-0']}
        }],
        exclude: [/node_moduels/]
      }
    ]
  }
}
