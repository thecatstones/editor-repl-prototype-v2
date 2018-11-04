console.log('[INDEX.JS]: first line')


// ======================= Editor =========================
import CodeMirror from 'codemirror-minified/lib/codemirror.js'
import 'codemirror-minified/lib/codemirror.css'
import 'codemirror-one-dark-theme/one-dark.css'
import 'codemirror-minified/mode/javascript/javascript.js'
const code   = document.getElementById('codeMirrorContainer')
const editor = CodeMirror.fromTextArea(code, {
  mode:         'javascript',
  theme:        'one-dark',
  lineNumbers:  true,
  tabSize:      2,
})


// ========================= REPL ==========================
import { Terminal } from 'xterm'
import * as fit     from 'xterm/lib/addons/fit/fit'
import 'xterm/dist/xterm.css'
import './style.css'
Terminal.applyAddon(fit)
const term = new Terminal()

window.term = term

term.setOption('theme', {
  foreground:     '#abb2bf',
  background:     '#282c34',
  cursor:         '#e06c75',
  cursorAccent:   '#e06c75',
  selection:      '#98c379',
  black:          '#98c379',
  red:            '#d19a66',
  green:          '#d19a66',
  yellow:         '#61afef',
  blue:           '#61afef',
  magenta:        '#c678dd',
  cyan:           '#c678dd',
  white:          '#56b6c2',
  brightBlack:    '#56b6c2',
  brightRed:      '#abb2bf',
  brightGreen:    '#ffffff',
  brightYellow:   '#abb2bf',
  brightBlue:     '#abb2bf',
  brightMagenta:  '#3a3f4b',
  brightCyan:     '#5c6370',
  brightWhite:    '#1e2127',
})
term.setOption('cursorBlink', true)
term.setOption('enableBold', true)
term.setOption('fontSize', 15)
term.setOption('fontFamily', 'monospace')
term.setOption('tabStopWidth', 2)

term.open(document.getElementById('terminal'))
term.fit()
term.write('> ')

const termTextArea = document.querySelector('.xterm-helper-textarea')

let state = {
  line: '',
}

const evaluate = (line) => {
  console.log('[evaluate]', 'state.line ==', state.line, 'line ==', line)
  return fetch('/input', {
    method:   'POST',
    headers:  { 'Content-Type': 'text/plain; charset=utf-8' },
    body:     line,
  })
}

const handleTermEnter = (event) => {
  console.log('[handleTermEnter]', event)
  term.writeln('')
  evaluate(state.line)
    .then(response => response.text())
    .then((data) => {
      console.log('[response data]:', data)
      term.write(data)
      state.line = ''
    })
}

const handleTermBackspace = (event) => {
  console.log('[handleTermBackspace]', event)
  term.write('\b \b')
  state.line = state.line.slice(0, -1)
  console.log('state.line ==', state.line)
}

const handleTermKeypress = (key, event) => {
  console.log('----------------------\n[handleTermKeypress]', 'state.line ==', state.line, key, event)
  term.write(key)
  state.line += key
}

const handleTermKeydown = (event) => {
  console.log('----------------------\n[handleTermKeydown]', 'state.line ==', state.line, event)
  if      (event.key === 'Enter')     handleTermEnter(event)
  else if (event.key === 'Backspace') handleTermBackspace(event)
}

term.on('keypress', handleTermKeypress)
term.on('keydown', handleTermKeydown)

// term.on('key', (...args) => console.log('key', args))
// term.on('keydown', (...args) => console.log('keydown', args))

// document.addEventListener('keyup', (event) => {
//   console.log('[keyup listener]', 'state.line ==', state.line, event)
//   if (event.target !== termTextArea) return
//   if (event.key === 'Enter') handleTermEnter(event)
//   else if (event.key === 'Backspace') handleTermBackspace(event)
// })


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
  console.log('Yjs instance ready!')
  window.y = y

  y.share.editorText.bindCodeMirror(editor)
})


// Yjs
window.Y          = Y
window.io         = Y['websockets-client'].io
// CodeMirror
window.CodeMirror = CodeMirror
window.code       = code
window.editor     = editor
// xterm.js
window.term       = term


console.log('[INDEX.JS]: last line')
