import Express from 'express'
import MemoryFileSystem from 'memory-fs'
import path from 'path'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './webpack.config'

const PORT = 8060
const app = Express()
const compiler = webpack(webpackConfig)

console.log('\x1b[32m%s\x1b[0m', `Staring app on port ${PORT}\n`)

app.use(webpackDevMiddleware(compiler))
app.use(webpackHotMiddleware(compiler))

app.use(Express.static('./public/'))
app.use('/env', Express.static('./.env.json'))

app.use('*', (_req, res, next) => {
  const filename = path.join(compiler.outputPath, 'index.html')
  // webpackDevMiddleware assigns an instance of MemoryFileSystem
  // as outputFileSystem of compiler.
  const webpackOutput = compiler.outputFileSystem as MemoryFileSystem

  webpackOutput.readFile(filename, (err, result) => {
    if (err) {
      return next(err)
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})

app.listen(PORT)
