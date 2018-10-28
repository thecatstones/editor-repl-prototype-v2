import './style.css'

import Y                 from 'yjs'
import yWebsocketsClient from 'y-websockets-client'
import yMemory           from 'y-memory'
import yArray            from 'y-array'
import yText             from 'y-text'
Y.extend(yWebsocketsClient, yMemory, yArray, yText)

// import CodeMirror from 'codemirror'
// import '../node_modules/codemirror/lib/codemirror.css'
// import '../node_modules/codemirror/theme/seti.css'
import CodeMirror from 'codemirror/lib/codemirror.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/seti.css'
import 'codemirror/mode/javascript/javascript.js'
// import jQuery for CodeMirror...?

import GlotAPI from 'glot-api'
const glot = new GlotAPI('5bfee566-cb63-494d-958c-f9c8daab274e')

var io = Y['websockets-client'].io
// var url = window.location.href.includes('heroku') ? 'https://catstones-websocket-server.herokuapp.com/' : undefined
const url = 'https://catstones-websocket-server.herokuapp.com/'
// var url = io('https://catstones-websocket-server.herokuapp.com/')
              // https://catstones-websocket-server.herokuapp.com/

Y({
  db: {
    name: 'memory',                // store the shared data in memory
  },
  connector: {
    name: 'websockets-client',     // use the websockets connector
    room: 'my room',               // instances connected to the same room share data

    // TODO: stop Chrome from blocking connection to heroku server when running locally
    // - comment out `url` to use Yjs-provided WebSocket server
    url,
    // url: 'localhost:1234',
    // url: 'https://catstones-websocket-server.herokuapp.com/',
    // url: 'https://catstones-websocket-server.herokuapp.com/',
  },
  share: {                         // specify the shared content
    array: 'Array',                // y.share.array is of type Y.Array
    text:  'Text',                 // y.share.text is of type Y.Text
    text2:  'Text',
  },
}).then((y) => {                   // Yjs is successfully initialized
  // for debugging
  window.y = y
  window.Y = Y
  console.log('Yjs instance ready!')

  // setup CodeMirror
  const code = document.querySelector('#codeMirrorContainer')
  const editor = CodeMirror.fromTextArea(code, {
    mode:        'javascript',
    theme:       'seti',
    lineNumbers: true,
    tabSize:     2,
  })

  y.share.text.bindCodeMirror(editor)

  // debugging
  window.CodeMirror = CodeMirror
  window.code       = code
  window.editor     = editor
  window.glot       = glot

  // setup Glot
  // TODO: fix 'Access-Control-Allow-Origin' 405 error
  const runEditorButton = document.querySelector('#run-editor-code')
  runEditorButton.addEventListener('click', (event) => {
    event.preventDefault()
    glot.run('javascript', [{
      name: 'editor.js',
      content: 'console.log(42)',
    }])
  })
  



  // setup REPL
  const consoleElm  = document.querySelector('#console')
  const clearButton = document.querySelector('#clear')

  clearButton.addEventListener('click', (event) => {
    y.share.array.delete(0, y.share.array.length)
    consoleForm.reset()
    y.share.text2.delete(0, y.share.text2.length)
  })

  const consoleForm = document.querySelector('#console-form')
  consoleForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let command = event.target.querySelector('#command').value
    y.share.array.push([`>> ${command}\n`])
    let value   = eval(command)
    let output  = `${JSON.stringify(value)}\n`
    y.share.array.push([output])
    consoleForm.reset()
    y.share.text2.delete(0, y.share.text2.length)
  })

  y.share.text2.bind(document.querySelector('#command'))

  y.share.array.observe(event => {
    if (event.type == 'insert') {
      event.values.forEach(value => {
        consoleElm.innerHTML += value
      })
    } else {
      consoleElm.innerHTML = ''
    }
  })
})
