const u = require('../utils.js')
u.initP()

const fs = require('fs')
const EventEmitter = require('events')

// // 0
// console.log('__dirname:', __dirname)     // directory name of current script
// console.log('cwd:      ', process.cwd()) // directory nodejs process was called from...?


// 1
function fileSize(fileName, cb) {
  if (typeof fileName !== 'string') {
    return cb(new TypeError('argument must be string')) // Sync
  }
  fs.stat(fileName, (err, stats) => {
    if (err) return cb(err) // Async
    cb(null, stats.size)
  })
}
// fileSize('repl.js', p)
// fileSize('server.js', p)
// fileSize(42, p)


// 2
function readFileAsArray(file, cb) {
  fs.readFile(file, (err, data) => {
    if (err) return cb(err)
    let lines = data.toString().trim().split('\n')
    cb(null, lines)
  })
}
// readFileAsArray('numbers.txt', p)
// readFileAsArray(42, p)
// readFileAsArray('numbers.txt', (err, lines) => {
//   if (err) throw err
//   let numbers    = lines.map(Number)
//   let oddNumbers = numbers.filter(n => n % 2 === 1)
//   p(`Odd numbers count: ${oddNumbers.length}`)
// })


// 3
function readFileAsArray(file, cb=()=>{}) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err)
        return cb(err)
      }
      let lines = data.toString().trim().split('\n')
      resolve(lines)
      cb(null, lines)
    })
  })
}

// readFileAsArray('numbers.txt')
//   .then(lines => {
//     let numbers    = lines.map(Number)
//     let oddNumbers = numbers.filter(n => n % 2 === 1)
//     p(`Odd numbers count: ${oddNumbers.length}`)
//   })
//   .catch(console.error)


// 4
async function countOdd() {
  try {
    p('BEFORE await')
    let lines    = await readFileAsArray('./numbers.txt')
    p('AFTER await')
    let numbers  = lines.map(Number)
    let oddCount = numbers.filter(n => n % 2 === 1).length
    p(`Odd numbers count async: ${oddCount}`)
  } catch(err) {
    console.error(err)
  }
}
// p('BEFORE countOdd()')
// countOdd()
// p('AFTER countOdd()')


// 5
class MyEmitter extends EventEmitter {
  
}

let emitter = new MyEmitter()
emitter.emit('something-happened').p

