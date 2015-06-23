'use strict'

import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
  fullName  : { type: String },
  picture   : { type: String },
  department: { type: String },
  title     : { type: String },
  phone     : { type: String }
})

let employeeModel = mongoose.model('Employee', employeeSchema)

export default employeeModel
