const path = require('path')
const Express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require("webpack-hot-middleware")
const getWebpackConfig = require('./config/webpack.dev')

const app = Express()

const webpackConfig = getWebpackConfig()
const compiler = webpack(webpackConfig)

console.log('\x1b[32m%s\x1b[0m', 'Staring app on 8060\n')

app.use(webpackDevMiddleware(compiler))
app.use(webpackHotMiddleware(compiler))

app.use(Express.static('./public/'))
app.use('/env', Express.static('./.env.json'))

app.use('*', (req, res, next) => {
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

app.listen(8060)
