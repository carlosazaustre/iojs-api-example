'use strict'

import jsonBody from 'body/json'
import Employee from '../models/employee'
import { fail } from '../helpers/handler'

class EmployeeController {

  // --  GET /employees --------------------------------------------------------

  getAll (req, res) {
    Employee.find((err, employees) => {
      if (err) return fail(err, res)

      console.log('GET /employees')
      res.end(JSON.stringify({
        message: 'OK',
        employees: employees
      }))

    })
  }

  // -- GET /employees/:id -----------------------------------------------------

  get (req, res) {
    let employeeId = this.employeeId

    Employee.findById(employeeId, (err, employee) => {
      if (err) return fail(err, res)

      console.log(`GET /employees/${employeeId}`)
      res.end(JSON.stringify({
        message: 'OK',
        employee: employee
      }))

    })
  }

  // -- POST /employees --------------------------------------------------------

  save (req, res) {
    jsonBody(req, res, (err, body) => {
      if (err) return fail(err, res)

      Employee.create(body, (err, data) => {
        res.end(JSON.stringify({
          message: 'OK',
          employee: data
        }))
      })
    })
  }

  // -- DELETE /employees/:employeeId ------------------------------------------

  remove (req, res, next) {
    let employeeId = this.employeeId
    if (!employeeId) return next()

    Employee.findOneAndRemove({ _id: employeeId }, (err) => {
      if (err) return fail(err, res)

      res.end(JSON.stringify({
        message: 'Employee Deleted'
      }))
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

        res.end(JSON.stringify({
          message: 'Employee Updated'
        }))
      })
    })
  }
}

export default EmployeeController
