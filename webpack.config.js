const path    = require('path')
const webpack = require('webpack')

module.exports = {
  // mode: 'development',
  // devtool: 'inline-source-map',
  entry: './src/index.js',
  devServer: {
    contentBase: './dist',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/y.*/),  // TODO: lookup
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
}
