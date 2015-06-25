'use strict'

import path from 'path'
import course from 'course'
import EmployeeController from '../controllers/employee'

const router = course()
const employeeCtrl = new EmployeeController()

router.all(function (req, res, next) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('x-ver', '1.0')
  next()
})

router.get('/', function (req, res) {
  res.end('Welcome to Employee API REST')
})

router.get('/employees',             employeeCtrl.getAll)
router.get('/employees/:employeeId', employeeCtrl.get)
router.post('/employees',            employeeCtrl.save)

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
