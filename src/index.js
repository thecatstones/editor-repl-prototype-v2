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
    array:       'Array',
    editorText:  'Text',
    termLine:    'Array',
    termOutput:  'Array',
  },
}).then((y) => {                // Yjs is successfully initialized
  console.log('Yjs instance ready!')
  window.y = y

  y.share.editorText.bindCodeMirror(editor)

  y.share.termLine.observe((event) => {
    if (event.type === 'insert') {
      event.values.forEach((val) => {
        term.write(val)
        state.line += val
      })
    } else {
      term.write('\b \b')
      state.line = state.line.slice(0, -1)
    }
  })
})



// #================= REPL =================#
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
  y.share.termLine.delete(y.share.termLine.length - 1)
  // term.write('\b \b')
  // state.line = state.line.slice(0, -1)
  // console.log('state.line ==', state.line)
}

const handleTermKeypress = (key, event) => {
  console.log('----------------------\n[handleTermKeypress]', 'state.line ==', state.line, key, event)
  y.share.termLine.push([key])
  // term.write(key)
  // state.line += key
}

const handleTermKeydown = (event) => {
  console.log('----------------------\n[handleTermKeydown]', 'state.line ==', state.line, event)
  if      (event.key === 'Enter')     handleTermEnter(event)
  else if (event.key === 'Backspace') handleTermBackspace(event)
}

const handleRunCodeClick = (event) => {
  console.log('[handleRunCodeClick]', event)
  let editorText = y.share.editorText._content.map(x => x.val).join('')
  term.writeln('')
  evaluate(editorText)
    .then(response => response.text())
    .then((data) => {
      console.log('[response data]:', data)
      term.write(data)
      state.line = ''
    })
}

term.on('keypress', handleTermKeypress)
term.on('keydown',  handleTermKeydown)

const runCodeButton   = document.getElementById('run-code')
runCodeButton.onclick = handleRunCodeClick





//  // setup REPL sharing
//   // TODO: refactor
//   const consoleElm  = document.querySelector('#console')
//   const clearButton = document.querySelector('#clear')

//   clearButton.addEventListener('click', (event) => {
//     y.share.array.delete(0, y.share.array.length)
//     consoleForm.reset()
//     y.share.ReplText.delete(0, y.share.ReplText.length)
//   })

//   const consoleForm = document.querySelector('#console-form')
//   consoleForm.addEventListener('submit', (event) => {
//     event.preventDefault()
//     let command = event.target.querySelector('#command').value
//     y.share.array.push([`>> ${command}\n`])
//     let value   = eval(command)
//     let output  = `${JSON.stringify(value)}\n`
//     y.share.array.push([output])
//     consoleForm.reset()
//     y.share.ReplText.delete(0, y.share.ReplText.length)
//   })

//   y.share.ReplText.bind(document.querySelector('#command'))

//   y.share.array.observe(event => {
//     if (event.type == 'insert') {
//       event.values.forEach(value => {
//         consoleElm.innerHTML += value
//       })
//     } else {
//       consoleElm.innerHTML = ''
//     }
//   })



// #===========================================#
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
