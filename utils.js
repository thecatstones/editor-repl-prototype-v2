p = (...args) => (console.log(...args), args[0])
// global.p = p
// module.exports.p = p

module.exports = {
  // p(...a) {
  //   (console.log(...a), a[0])
  // },
  p,
  addPToObj() {
    Object.defineProperty(Object.prototype, 'p', {
      get() {
        console.log(this.valueOf())
        return this.valueOf()
      },
    })
  },
  initP() {
    p = p
    module.exports.addPToObj()
    // global.p = module.exports.p
  },
  initReplPad() {
    var replpad = require('replpad')
    var repl = global.repl || replpad({
      input:           process.stdin,
      output:          process.stdout,
      ignoreUndefined: false,
      useColors:       true,
      useGlobal:       true,
      terminal:        true,
    })
  },
  dirInfo() {
    console.log('__dirname:', __dirname)     // directory name of current script
    console.log('cwd:      ', process.cwd()) // directory nodejs process was called from...?
  }
}
