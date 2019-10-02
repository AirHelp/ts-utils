import HtmlWebpackPlugin from 'html-webpack-plugin'
import { resolve } from 'path'
import * as webpack from 'webpack'

const { NODE_ENV } = process.env
const DEV = 'development'
const PROD = 'production'

const isDevelopment = NODE_ENV === 'development'
const isProduction = NODE_ENV === 'production'

if (!NODE_ENV || ![DEV, PROD].includes(NODE_ENV)) {
  throw `Unsupported environment: ${NODE_ENV}`
}

const config = {
  context: resolve(__dirname, 'src'),

  ...(isDevelopment && { devtool: 'cheap-eval-source-map' }),

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
