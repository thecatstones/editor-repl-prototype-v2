import './style.css'

// ======================= Editor =========================
import CodeMirror from 'codemirror/lib/codemirror.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/seti.css'
import 'codemirror/mode/javascript/javascript.js'
const code   = document.getElementById('codeMirrorContainer')
const editor = CodeMirror.fromTextArea(code, {
  mode:         'javascript',
  theme:        'seti',
  lineNumbers:  true,
  tabSize:      2,
})


// ========================= REPL ==========================
import { Terminal } from 'xterm'
import * as fit     from 'xterm/lib/addons/fit/fit'
import 'xterm/dist/xterm.css'
Terminal.applyAddon(fit)
const term = new Terminal()

term.open(document.getElementById('terminal'))
term.fit()
term.writeln('----- The Cat Stones REPL -----')
term.writeln('')
term.write('>> ')

const termTextArea = document.querySelector('.xterm-helper-textarea')

let state = {
  line: '',
}

const evaluate = (line) => (
  fetch('/input', {
    method  : 'POST',
    headers : { 'Content-Type': 'text/plain; charset=utf-8' },
    body    : line,
  })
)

const handleTerminalKeypress = ({ target, key }) => {
  if (target !== termTextArea) return
  term.write(key)
  state.line += key
}

const handleEnterReleased = () => {
  term.writeln('')
  evaluate(state.line)
    .then(response => response.text())
    .then((data) => {
      console.log(data)
      term.write(data)
      state.line = ''
    })
}

const handleBackspaceReleased = () => {
  term.write('\b \b')
  state.line = state.line.slice(0, -1)
  console.log(state.line)
}

document.addEventListener('keypress', handleTerminalKeypress)

document.addEventListener('keyup', ({ target, key }) => {
  if (target !== termTextArea) return
  console.log(state.line)
  if (key === 'Enter')     return handleEnterReleased()
  if (key === 'Backspace') return handleBackspaceReleased()
})


// ========================= Yjs =========================
import Y                 from 'yjs'
import yWebsocketsClient from 'y-websockets-client'
import yMemory           from 'y-memory'
import yArray            from 'y-array'
import yText             from 'y-text'
Y.extend(yWebsocketsClient, yMemory, yArray, yText)
const url = 'https://catstones-websocket-server.herokuapp.com/'
const io  = Y['websockets-client'].io
Y({
  db: {
    name: 'memory',             // store the shared data in memory
  },
  connector: {
    name: 'websockets-client',  // use the websockets connector
    room: 'catstones-repl',     // instances connected to the same room share data
    // TODO: uncomment to use custom WebSocket server
    // socket: io(url),         // Pass socket.io object to use (CORS...?)
    // url,
  },
  share: {                      // specify the shared content
    array:         'Array',
    editorText:    'Text',
    terminalText:  'Text',
  },
}).then((y) => {                // Yjs is successfully initialized
  // ~~~~~ debugging ~~~~~ TODO: remove
  console.log('Yjs instance ready!')
  window.y = y

  y.share.editorText.bindCodeMirror(editor)
})


// ~~~~~ debugging ~~~~~ TODO: remove
// Yjs
window.Y          = Y
window.io         = Y['websockets-client'].io
// CodeMirror
window.CodeMirror = CodeMirror
window.code       = code
window.editor     = editor
// xterm.js
window.term       = term
