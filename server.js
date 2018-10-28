const express              = require('express')
const webpack              = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app      = express()
const config   = require('./webpack.config.js')
const compiler = webpack(config)

const path = require('path')
const port = process.env.PORT || 3000

const cors = require('cors')
const whitelist = [
  'http://localhost',
  'https://localhost',
  'https://catstones-editor.herokuapp.com',
  'https://catstones-editor-v2.herokuapp.com'
]
const corsOptions = {
  credentials: true,  // Set to true to pass the Access-Control-Allow-Credentials CORS header
  origin: (origin, callback) => {
    if (whitelist.includes(origin))
      return callback(null, true)
      callback(new Error('Not allowed by CORS'))
  }
}
app.use(cors(corsOptions))

// Use the webpack-dev-middleware and the webpack.config.js configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}))

app
  .use(express.static(path.join(__dirname, 'dist')))
  .get('/', (req, res) => res.sendFile('index.html'))
  .listen(port, () => console.log(`Express server listening on port ${port}`))
