const mongoose = require("mongoose")
const { Schema } = mongoose

const salesTrailSchema = new Schema({
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
  saleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sales",
    required: true,
},
  paid:{
    type:Boolean,
    defualt:false
  },

  
  date: {
    type: Date,
    default: Date.now,
  },
 
})

module.exports = mongoose.model("salesTrail", salesTrailSchema)
