const mongoose = require("mongoose")
const { Schema } = mongoose

const VenderTrailSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  venderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vender",
    required: true,
  },
  venderName: {
    type: String,
    ref: "vender",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  productName: {
    type: String,
    ref: "product",
    required: true,
  },
  productQuantity: {
    type: Number,
    ref: "product",
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
    required: true,
  },
  purchaseAmount: {
    type: Number,
    required: true,
  },
  singleUnitPrice: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("VenderTrail", VenderTrailSchema)
