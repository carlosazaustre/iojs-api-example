'use strict'

import path from 'path'
import course from 'course'
import jsonBody from 'body/json'

const router = course()

router.all(function (req, res, next) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  next()
})

router.get('/', function (req, res) {
  res.end('Hola Mundo!')
})

router.get('/yo', function (req, res) {
  res.end('Soy Carlos!')
})

function onRequest (req, res) {
  router(req, res, function (err) {
    if (err) return fail(err, res)

    res.statusCode = 404
    res.end(`404 Not Found: ${req.url}`)
  })
}

function fail (err, res) {
  res.statusCode = 500
  res.setHeader('Content-Type', 'text/plain')
  res.end(err.message)
}

export default onRequest
