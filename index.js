'use strict'

import http from 'http'
import router from './router'

const server = http.createServer()
const port = process.env.PORT || 3000

server.on('request', router)
server.on('listening', onListening)

server.listen(port)

function onListening () {
  console.log(`Server listening on http://localhost:${port}`)
}
