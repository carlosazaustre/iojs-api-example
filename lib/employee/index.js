'use strict'

import jsonBody from 'body/json'
import { fail, jsonfy } from '../utils/helpers'
import Employee from './models'

class EmployeeController {

  // --  GET /employees --------------------------------------------------------

  getAll (req, res) {
    Employee.find((err, employees) => {
      if (err) return fail(err, res)

      res.end(jsonfy('OK', employees))
    })
  }

  // -- GET /employees/:id -----------------------------------------------------

  get (req, res) {
    let employeeId = this.employeeId

    Employee.findById(employeeId, (err, employee) => {
      if (err) return fail(err, res)

      res.end(jsonfy('OK', employee))
    })
  }

  // -- POST /employees --------------------------------------------------------

  save (req, res) {
    jsonBody(req, res, (err, body) => {
      if (err) return fail(err, res)

      Employee.create(body, (err, employee) => {
        res.end(jsonfy('OK', employee))
      })
    })
  }

  // -- DELETE /employees/:employeeId ------------------------------------------

  remove (req, res, next) {
    let employeeId = this.employeeId
    if (!employeeId) return next()

    Employee.findOneAndRemove({ _id: employeeId }, (err) => {
      if (err) return fail(err, res)

      res.end(jsonfy('Employee ${employeeId} deleted succesfully'))
    })
  }

  // -- PUT /employees/:employeeId ---------------------------------------------

  update (req, res) {
    let employeeId = this.employeeId
    if (!employeeId) return next()

    jsonBody(req, res, (err, body) => {
      if (err) return fail(err, res)
      let updatedEmployee = body

      Employee.findOneAndUpdate({ _id: employeeId }, updatedEmployee, (err) => {
        if (err) return fail(err, res)

        res.end(jsonfy('Employee ${employeeId} updated succesfully'))
      })
    })
  }
}

export default EmployeeController
