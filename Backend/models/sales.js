const mongoose = require("mongoose")
const { Schema } = mongoose

const salesSchema = new Schema({
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
  customerName: {
    type: String,
    required: true,
  },
  
  quantity: {
    type: Number,
    required: true,
  },
  
  
  date: {
    type: Date,
    default: Date.now,
  },
 
})

module.exports = mongoose.model("sales", salesSchema)
