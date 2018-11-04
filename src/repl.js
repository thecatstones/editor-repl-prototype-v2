console.log('[REPL.JS]: first line')

const pty = require('node-pty')

const LANG_COMMANDS = {
  javascript:  'node',
  ruby:        'irb',
  python:      'python',
}

const Repl = {
  init(language = 'javascript') {
    let command  = LANG_COMMANDS[language]
    if (!command) throw 'Invalid language'
    this.language = language
    this.command  = command
    this.process  = pty.spawn(command)
    return this
  },

  on(event, callback) {
    this.process.on(event, callback)
  },

  write(string) {
    return new Promise((resolve, reject) => {
      this.process.write(`${string}\n`)
      let result = ''
      this.process.on('data', data => (result += data))
      setTimeout(() => (resolve(result)), 10)
      // Wait for output to buffer...
    })
  },
}

module.exports = Repl

console.log('[REPL.JS]: last line')
