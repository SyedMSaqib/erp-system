const mongoose = require("mongoose")
const { Schema } = mongoose

const attendanceSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
  },
  name: {
    type: String,
    required: true,
  },

  attendance: {
    type: Boolean,
    required: true,
    default:false,
  },

  date: {
    type: Date,
    required: true,
  },
})
module.exports = mongoose.model("attendance", attendanceSchema)
