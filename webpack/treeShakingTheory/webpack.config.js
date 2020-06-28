/**
 * Created by 海枯 on 2018/2/25.
 */
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './car.js',
  output: {
    filename: 'bundle.js'
  },
  /*module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'/!*,
          options: {
            cacheDirectory: true
          }*!/
        }
      }
    ]
  },*/
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new UglifyJSPlugin()
  ]
}