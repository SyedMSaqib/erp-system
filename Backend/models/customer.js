const mongoose=require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  
    name: {
    type: String,
    required: true,
  },
 
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  
  date: {
    type: Date,
    default: Date.now,
  },
})
module.exports=mongoose.model("customer",productSchema)
