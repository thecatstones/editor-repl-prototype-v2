import './style.css'

import Y                 from 'yjs'
import yWebsocketsClient from 'y-websockets-client'
import yMemory           from 'y-memory'
import yArray            from 'y-array'
import yText             from 'y-text'
Y.extend(yWebsocketsClient, yMemory, yArray, yText)

import CodeMirror from 'codemirror/lib/codemirror.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/seti.css'
import 'codemirror/mode/javascript/javascript.js'

const url = 'https://catstones-websocket-server.herokuapp.com/'
var io = Y['websockets-client'].io
window.io = io
window.Y = Y
Y({
  db: {
    name: 'memory',                // store the shared data in memory
  },
  connector: {
    name: 'websockets-client',     // use the websockets connector
    room: 'catstones-repl',        // instances connected to the same room share data
    socket: io(url),               // Pass socket.io object to use (CORS...?)
    url,
  },
  share: {                         // specify the shared content
    array:       'Array',
    editorText:  'Text',
    ReplText:    'Text',
  },
}).then((y) => {                   // Yjs is successfully initialized
  console.log('Yjs instance ready!')

  // setup CodeMirror
  const code = document.querySelector('#codeMirrorContainer')
  const editor = CodeMirror.fromTextArea(code, {
    mode:        'javascript',
    theme:       'seti',
    lineNumbers: true,
    tabSize:     2,
  })
  y.share.editorText.bindCodeMirror(editor)

  // debugging
  window.y          = y
  window.Y          = Y
  window.io         = Y['websockets-client'].io
  window.CodeMirror = CodeMirror
  window.code       = code
  window.editor     = editor



  // setup REPL
  // TODO: refactor
  const consoleElm  = document.querySelector('#console')
  const clearButton = document.querySelector('#clear')

  clearButton.addEventListener('click', (event) => {
    y.share.array.delete(0, y.share.array.length)
    consoleForm.reset()
    y.share.ReplText.delete(0, y.share.ReplText.length)
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
    y.share.ReplText.delete(0, y.share.ReplText.length)
  })

  y.share.ReplText.bind(document.querySelector('#command'))

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
