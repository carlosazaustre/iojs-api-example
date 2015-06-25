'use strict'

import jsonBody from 'body/json'
import Employee from '../models/employee'

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
    var employeeId = this.employeeId

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

      var employee = new Employee({
        fullName    : body.fullName,
        picture     : body.picture,
        department  : body.department,
        title       : body.title,
        phone       : body.phone
      })

      employee.save((err) => {
        if (err) return fail(err, res)

        console.log(`POST /employees \n ${employee}`)
        res.end(JSON.stringify({
          message: 'OK',
          employee: employee
        }))
      })

    })
  }
}

export default EmployeeController
