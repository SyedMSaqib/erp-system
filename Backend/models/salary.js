const mongoose=require('mongoose')
const { Schema } = mongoose

const salarySchema = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  
    employeeName: {
    type:String,
    required: true,
  },
    employeeId: {
    type:mongoose.Schema.Types.ObjectId,
    required: true,
  },
    Month: {
    type:String,
    required: true,
  },
    basePay: {
    type:Number,
    required: true,
  },
  monthlyPay: {
    type:Number,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
})
module.exports=mongoose.model("salary",salarySchema)
