const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app      = express()
const config   = require('./webpack.config.js')
const compiler = webpack(config)

const path = require('path')
const port = process.env.PORT || 3000

// TODO: get CORS to work on custom WebSocket Server
const cors = require('cors')
const corsOptions = {
  origin:      '*',
  credentials: true,  // Set to true to pass the Access-Control-Allow-Credentials CORS header
  allowedHeaders: [   // TODO: check if all these headers are necessary
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept-Type',
    'Authorization',
    '*',
  ],
}

const Repl = require('./repl.js')
let repl   = null

// ---------- Middleware ----------
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(cors(corsOptions))

// ---------- Routes ----------
app.get('/', (request, response) => {
  response.sendFile('index.html/javascript')
})

// TODO: kill previous REPL process when user switches to a different language
app.get('/:language', (request, response) => {
  console.log('params.language', request.params.language)
  let execCommand = Repl.LANGUAGES[request.params.language] || 'node'
  if (!execCommand) return
  repl = Repl.new(execCommand)
  response.sendFile(path.join(__dirname, './index.html'))
})

app.post('/input', (request, response) => {
  repl.write(request.body)
    .then((data) => {
      response.send(data)
    })
})

// ---------- Listen ----------
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})
