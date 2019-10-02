import HtmlWebpackPlugin from 'html-webpack-plugin'
import { resolve } from 'path'
import * as webpack from 'webpack'

const DEV = 'development' as const
const PROD = 'production' as const
const EVAL = 'eval' as const

const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'

if (process.env.NODE_ENV !== DEV && process.env.NODE_ENV !== PROD) {
  console.log(process.env.NODE_ENV)

  throw 'Unsupported env'
}

const config = {
  context: resolve(__dirname, 'src'),

  ...(isDevelopment && { devtool: EVAL }),

  entry: isProduction
    ? './index.tsx'
    : ['webpack-hot-middleware/client', 'react-hot-loader/patch', './index.tsx'],

  mode: isProduction ? PROD : DEV,
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
    chunkFilename: '[name].[hash].js',
    filename: 'bundle.[hash].js',
    path: resolve(__dirname, 'dist'),
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
      template: resolve(__dirname, 'src', 'index.html')
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development')
    }),

    new webpack.HotModuleReplacementPlugin()
  ] as any[],
  resolve: {
    extensions: ['.tsx', '.json', '.ts', '.js', '.jsx'],

    ...(isDevelopment && {
      alias: {
        'react-dom': '@hot-loader/react-dom'
      }
    })
  }
}

export default config
