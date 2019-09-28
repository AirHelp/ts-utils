const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const webpack = require('webpack')

module.exports = () =>
  webpackMerge(baseConfig(), {
    devtool: 'eval',
    entry: [
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      './index.tsx'
    ],
    mode: 'development',
    output: {
      chunkFilename: '[name].bundle.js',
      filename: 'bundle.[hash].js'
    },
    performance: {
      hints: false
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom'
      }
    }
  })
