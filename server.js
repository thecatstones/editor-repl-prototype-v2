require('dotenv').config({ path: '.env' })
const fetch = require('node-fetch')

const express              = require('express')
const webpack              = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app      = express()
const config   = require('./webpack.config.js')
const compiler = webpack(config)

const path = require('path')
const port = process.env.PORT || 3000

// enable CORS
const cors = require('cors')
const corsOptions = {
  origin: '*',
  credentials: true,  // Set to true to pass the Access-Control-Allow-Credentials CORS header
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type', 
    'Accept-Type',
    '*',
  ],
}
app.use(cors(corsOptions))

// Use the webpack-dev-middleware and the webpack.config.js configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}))

app.use(express.static(path.join(__dirname, 'dist')))

app.listen(port, () => console.log(`Express server listening on port ${port}`))

app.get('/', (req, res) => res.sendFile('index.html'))

const EXTS = {javascript:'js', ruby:'rb', python:'py'}
const submitCode = (data, fn) => {
  let json = JSON.stringify({
    stdin: data.input,
    files: [{
      name:    `main.${EXTS[data.language]}`,
      content: data.sourceCode,
    }]
  })
  fetch(`https://run.glot.io/languages/${data.language}/latest/`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.GLOT_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: json,
  })
  .then((error, response, body) => {
    fn(error)
  })
}

app.post('/submit', (req, res) => {
  let data = {
    language:   req.body.language,
    input:      req.body.input,
    sourceCode: req.body.sourceCode,
  }

  submitCode(data, (body) => {
    res.send(body)
  })
})
