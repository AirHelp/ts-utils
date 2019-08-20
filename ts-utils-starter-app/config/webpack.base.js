const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = require('path').resolve
const webpack = require('webpack')

module.exports = () => ({
  context: resolve(__dirname, '..', 'src'),
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  output: {
    path: resolve(__dirname, '..', 'dist'),
    publicPath: '/'
  },
  performance: {
    hints: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '..', 'src', 'index.html')
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: ['.tsx', '.json', '.ts', '.js', '.jsx']
  }
})
