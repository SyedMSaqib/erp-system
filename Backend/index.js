const express = require('express')
const app = express()
const port = 5000
const dbConnection=require('./dbConnection')
const auth=require("./routes/auth")
const product=require("./routes/product")   
var cors = require('cors')
const customer = require('./routes/customer')


dbConnection()

app.use(cors()) 
app.use(express.json())
app.use('/auth', auth)
app.use('/product', product)
app.use('/customer',customer)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})