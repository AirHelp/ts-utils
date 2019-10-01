import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import { getBaseConfig } from './webpack.base'

const getConfig = () =>
  webpackMerge(getBaseConfig(), {
    entry: './index.tsx',
    mode: 'production',
    output: {
      chunkFilename: '[name].[hash].js',
      filename: 'bundle.[hash].js'
    },
    // @types/webpack-merge hasn't been updated in a while and definitions
    // for Plugin got out of sync with @types/webpack.
    // TODO: Remove `as any` when up-to-date version of @types/webpack-merge is released.
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ] as any[]
  })

export default getConfig
