// var utils = require('./utils.js')

//
// var replpad = require('replpad')
// var repl = global.repl || replpad({
//   input:           process.stdin,
//   output:          process.stdout,
//   ignoreUndefined: false,
//   useColors:       true,
//   useGlobal:       true,
//   terminal:        true,
// })

var os  = require('os')
var pty = require('node-pty')

var shell = 'bash'

var ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd:  process.env.HOME,
  env:  process.env,
})

// ptyProcess.on('data', data => {
//   console.log(data)
// })


// ptyProcess.write('ls\r')
// ptyProcess.resize(100, 40)
// ptyProcess.write('ls\r')
//
//

1

