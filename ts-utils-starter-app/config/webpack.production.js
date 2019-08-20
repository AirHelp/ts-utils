const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = () =>
  webpackMerge(baseConfig(), {
    entry: './index.tsx',
    mode: 'production',
    output: {
      chunkFilename: '[name].[hash].js',
      filename: 'bundle.[hash].js'
    },
    performance: {
      hints: false
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
  })
