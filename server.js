console.log('[SERVER.JS]: first line')

const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app      = express()
const config   = require('./webpack.config.js')
const compiler = webpack(config)

const path = require('path')
const port = process.env.PORT || 3000

const bodyParser = require('body-parser')

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

const Repl = require('./src/repl.js')
let repl   = Object.create(Repl).init('javascript')
console.log(repl)

// ---------- Middleware ----------
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(cors(corsOptions))
app.use(bodyParser.text())


// ---------- Listen ----------
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})


// ---------- Routes ----------
app.get('/', (request, response) => {
  // repl = Repl.new(langRuntime)
  console.log('[ GET / ]', 'repl:', repl)
  response.sendFile(path.join(__dirname, './dist/index.html'))
})

app.post('/input', (request, response) => {
  console.log('[ POST /input ]', '\nrepl.command:', repl.command, '\nrequest.body:', request.body)
  repl.write(request.body)
      .then(data => response.send(data))
})

// TODO: kill previous REPL process when user switches to a different language
// app.get('/:language', (request, response) => {
//   console.log('[request.params.language]', request.params.language)
//   let langRuntime = Repl.LANGUAGES[request.params.language] || 'node'
//   if (!langRuntime) return
  // repl = Repl.new(langRuntime)
  // response.sendFile(path.join(__dirname, './dist/index.html'))
// })

console.log('[SERVER.JS]: last line')
