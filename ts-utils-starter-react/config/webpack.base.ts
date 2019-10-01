import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import { resolve } from 'path'
import * as webpack from 'webpack'

export const getBaseConfig = () => ({
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
    hints: false as false
  },
  // @types/webpack-merge hasn't been updated in a while and definitions
  // for Plugin got out of sync with @types/webpack.
  // TODO: Remove `as any` when up-to-date version of @types/webpack-merge is released.
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '..', 'src', 'index.html')
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ] as any[],
  resolve: {
    extensions: ['.tsx', '.json', '.ts', '.js', '.jsx']
  }
})
