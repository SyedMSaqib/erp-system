const mongoose = require("mongoose")
const { Schema } = mongoose

const receivableAccount = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  nature: {
    type: String,
    required: true,
  },

  Description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})
module.exports = mongoose.model("receivableAccount", receivableAccount)