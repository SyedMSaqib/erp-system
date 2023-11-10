const mongoose = require("mongoose")
const { Schema } = mongoose

const productSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
    required: true,
  },
  product: {
    type: String,
    required: true,
  },

  quantity: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
})
module.exports = mongoose.model("sales", productSchema)
