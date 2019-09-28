const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = () =>
  webpackMerge(baseConfig(), {
    devtool: 'eval',
    entry: ['./index.tsx'],
    mode: 'development',
    output: {
      chunkFilename: '[name].bundle.js',
      filename: 'bundle.[hash].js'
    },
    performance: {
      hints: false
    },
    plugins: []
  })
