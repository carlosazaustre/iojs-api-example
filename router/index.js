'use strict'

import path from 'path'
import course from 'course'
import jsonBody from 'body/json'
import Employee from '../models/employee'

const router = course()

router.all(function (req, res, next) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('x-ver', '1.0')
  next()
})

router.get('/', function (req, res) {
  res.end('Welcome to Employee API REST')
})

router.get('/employees', function (req, res) {
  Employee.find(function(err, employees) {
    console.log('GET /employees')
    res.end(JSON.stringify({
      message: 'OK',
      employees: employees
    }))
  })
})

router.post('/employees', function (req, res) {
  jsonBody(req, res, function(err, body) {
    if (err) return fail(err, res)

    var employee = new Employee({
      fullName    : body.fullName,
      picture     : body.picture,
      department  : body.department,
      title       : body.title,
      phone       : body.phone
    })

    employee.save(function(err) {
      if (err) console.log('ERROR on created Employee')

      console.log(`POST /employees \n ${empoyee}`)
      res.end(JSON.stringify({
        message: 'OK',
        employee: employee
      }))
    })
  })
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
