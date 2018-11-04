console.log('[ENTRY.JS]: first line')

require = require('esm')(module, {
  mode: 'auto',
})

module.exports = require('./server.js')

console.log('[ENTRY.JS]: last line')
