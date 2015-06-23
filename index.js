'use strict'

import http from 'http'

const server = http.createServer()
const port = process.env.PORT || 3000

server.on('request', onRequest)
server.on('listening', onListening)

server.listen(port)

function onRequest () {
  console.log(`Request`)
}

function onListening () {
  console.log(`Server listening on http://localhost:${port}`)
}
