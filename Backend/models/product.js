const mongoose=require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  vendorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "vendor"
  },
  
    name: {
    type: String,
    required: true,
  },
  description: { 
    type: String,
     required: true 
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  vendor: {
    type: String,
    required: true,
  },
  vendorPrice: {
    type: Number,
    required: true,
  },
  
  date: {
    type: Date,
    default: Date.now,
  },
})
module.exports=mongoose.model("product",productSchema)
