import Express from 'express'
import path from 'path'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import getWebpackConfig from './config/webpack.dev'

const PORT = 8060

const app = Express()

const webpackConfig = getWebpackConfig()
const compiler = webpack(webpackConfig)

console.log(`\x1b[32m%s\x1b[0m', 'Staring app on port ${PORT}\n`)

app.use(webpackDevMiddleware(compiler))
app.use(webpackHotMiddleware(compiler))

app.use(Express.static('./public/'))
app.use('/env', Express.static('./.env.json'))

app.use('*', (_req, res, next) => {
  const filename = path.join(compiler.outputPath, 'index.html')
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err)
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})

app.listen(PORT)
