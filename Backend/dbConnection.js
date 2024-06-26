
const mongoose = require('mongoose');
<<<<<<< HEAD
// const uri='mongodb+srv://splasher733:PJa3W8PibxvQZ8s@cluster0.icjtgav.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const uri='mongodb://127.0.0.1:27017/Erp'
=======
const uri='mongodb+srv://splasher733:PJa3W8PibxvQZ8s@cluster0.icjtgav.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// const uri='mongodb://127.0.0.1:27017/Erp'
>>>>>>> 76f856b368c2d7cc663d3b28d74f156dbf75018b



 function connection() {
  mongoose.connect(uri);
  console.log("Connected to MongoDb")
}

module.exports=connection