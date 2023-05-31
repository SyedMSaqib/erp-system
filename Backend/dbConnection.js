
const mongoose = require('mongoose');
const uri='mongodb://127.0.0.1:27017/Erp'



 function connection() {
  mongoose.connect(uri);
  console.log("Connected to MongoDb")
}

module.exports=connection