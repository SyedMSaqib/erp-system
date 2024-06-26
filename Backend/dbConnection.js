
const mongoose = require('mongoose');

const uri='mongodb+srv://splasher733:PJa3W8PibxvQZ8s@cluster0.icjtgav.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// const uri='mongodb://127.0.0.1:27017/Erp'



 function connection() {
  mongoose.connect(uri);
  console.log("Connected to MongoDb")
}

module.exports=connection