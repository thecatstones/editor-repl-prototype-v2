const pty = require('node-pty')

const Repl = {
  // TODO: add langs and uncomment
  LANGUAGES: {
    javascript : 'node',
    // python     : 'python',
    // ruby       : 'pry',
  },

  new(execCommand) {
    return Object.create(this.init(execCommand))
  },

  init(execCommand) {
    this.process = pty.spawn(execCommand)
    return this
  },

  on(event, callback) {
    this.process.on(event, callback)
  },

  write(string) {
    return new Promise((resolve, reject) => {
      let result = ''
      this.process.write(`${string}\n`)
      this.process.on('data', (data) => {
        result += data
      })
      setTimeout(() => {
        resolve(result)
      }, 10)
      // Wait for output to buffer...
    })
  },
}

module.exports = Repl
