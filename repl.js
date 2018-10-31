var os  = require('os')
var pty = require('node-pty')

var shell = 'bash'

console.log(42)
// debugger

// var ptyProcess = pty.spawn(shell, [], {
//   name: 'xterm-color',
//   cols: 80,
//   rows: 30,
//   cwd:  process.env.HOME,
//   env:  process.env,
// })

console.log(43)

// ptyProcess.on('data', data => {
//   console.log(data)
// })

// ptyProcess.write('ls\r')
// ptyProcess.resize(100, 40)
// ptyProcess.write('ls\r')
