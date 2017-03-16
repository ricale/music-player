const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].js',
    // path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, './')
  },
  devtool: "cheap-eval-source-map",
  resolve: {
    extensions: ['.js', '.jsx']
  },
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
