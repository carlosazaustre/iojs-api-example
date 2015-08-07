'use strict'

import jsonBody from 'body/json'
import { fail, jsonfy } from 'api-helpers'
import Employee from './model'

class EmployeeController {

  // --  GET /employees --------------------------------------------------------

  getAll(req, res) {

    Employee
      .find({}, 'fullName picture')
      .then((employees) => {
        res.statusCode = 200
        res.end(jsonfy('OK', employees))
      })
      //.then((err) => fail(err, res))
  }

  // -- GET /employees/:employeeId ----------------------------------------------

  get(req, res) {
    let employeeId = req.params.employeeId

    Employee
      .findById(employeeId)
      .then((employee) => {

        if(employee) {
          res.statusCode = 200
          res.end(jsonfy('OK', employee))
        } else {
          res.statusCode = 404
          res.end(jsonfy(`Employee ${employeeId} does not exists`))
        }

      })
      //.then((err) => fail(err, res))
  }

  // -- POST /employees --------------------------------------------------------

  save(req, res) {

    jsonBody(req, res, (err, body) => {
      if (err) return fail(err, res)

      Employee
        .create(body)
        .then((employee) => {
          res.statusCode = 201
          res.end(jsonfy('OK', employee))
        })
        //.then((err) => fail(err, res))
    })
  }

  // -- DELETE /employees/:employeeId ------------------------------------------

  remove(req, res, next) {
    let employeeId = req.params.employeeId

    if (!employeeId) {
      res.statusCode = 404
      return next()
    }

    Employee
      .findOneAndRemove({ _id: employeeId })
      .then(() => {
        res.statusCode = 204
        res.end(jsonfy(`Employee ${employeeId} deleted succesfully`))
      })
      //.then((err) => fail(err, res))
  }

  // -- PUT /employees/:employeeId ---------------------------------------------

  update(req, res) {
    let employeeId = req.params.employeeId

    if (!employeeId) {
      res.statusCode = 404
      return next()
    }

    jsonBody(req, res, (err, body) => {
      if (err) return fail(err, res)
      let updatedEmployee = body

      Employee
        .findOneAndUpdate({ _id: employeeId }, updatedEmployee)
        .then((employee) => {
          res.statusCode = 200
          res.end(jsonfy(`Employee ${employeeId} updated succesfully`, employee))
        })
        //.then((err) => fail(err, res))
    })
  }
}

export default EmployeeController
