import Dotenv from 'dotenv-webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { resolve } from 'path'
import * as webpack from 'webpack'

const DEV = 'development' as const
const PROD = 'production' as const

const NODE_ENV = process.env.NODE_ENV === 'production' ? PROD : DEV

const isDevelopment = NODE_ENV === DEV
const isProduction = NODE_ENV === PROD

if (!NODE_ENV || ![DEV, PROD].includes(NODE_ENV)) {
  throw `Unsupported environment: ${NODE_ENV}`
}

const config = {
  context: resolve(__dirname, 'src'),

  ...(isDevelopment && { devtool: 'cheap-eval-source-map' as const }),

  entry: isProduction
    ? './index.tsx'
    : ['webpack-hot-middleware/client', 'react-hot-loader/patch', './index.tsx'],

  mode: NODE_ENV,

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

  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src', 'index.html')
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

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
