const mongoose = require("mongoose")
const { Schema } = mongoose

const rolesSchema = new Schema({
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  access: {
    type: Boolean,
    default: true,
  },
})
module.exports = mongoose.model("roles", rolesSchema)
