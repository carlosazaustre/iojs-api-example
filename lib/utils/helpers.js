'use strict'

function fail (err, res) {
  res.statusCode = 500
  res.setHeader('Content-Type', 'text/plain')
  res.end(err.message)
}

function jsonfy (message, data) {
  return JSON.stringify({
    message : message,
    data    : data
  })
}

export { fail, jsonfy }
