const mongoose = require("mongoose")
const { Schema } = mongoose

const cashAccount = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  balance: {
    type: Number,
    required: true,
    default: 0,
  },

  date: {
    type: Date,
    default: Date.now,
  },
})
module.exports = mongoose.model("cashAccount", cashAccount)
