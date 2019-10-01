import * as webpack from 'webpack'
import * as webpackMerge from 'webpack-merge'
import { getBaseConfig } from './webpack.base'

const getConfig = () =>
  webpackMerge(getBaseConfig(), {
    devtool: 'eval',
    entry: ['webpack-hot-middleware/client', 'react-hot-loader/patch', './index.tsx'],
    mode: 'development',
    output: {
      chunkFilename: '[name].bundle.js',
      filename: 'bundle.[hash].js'
    },
    // @types/webpack-merge hasn't been updated in a while and definitions
    // for Plugin got out of sync with @types/webpack.
    // TODO: Remove `as any` when up-to-date version of @types/webpack-merge is released.
    plugins: [new webpack.HotModuleReplacementPlugin()] as any[],
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom'
      }
    }
  })

export default getConfig
