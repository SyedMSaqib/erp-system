const express = require("express")
const app = express()
const port = 5000
const dbConnection = require("./dbConnection")
const auth = require("./routes/auth")
const product = require("./routes/product")
var cors = require("cors")
const customer = require("./routes/customer")
const customerSale = require("./routes/customerSales")
const employee = require("./routes/employee")
const attendance = require("./routes/attendance")
const salesTrails = require("./routes/saleTrials")
const vendor = require("./routes/vendor")
const vendorTrails = require("./routes/venderTrails")
const salary = require("./routes/salary")
const accountEntries = require("./routes/accountEntries")
const profit = require("./routes/profit")
const prophet = require("./routes/prophetPredictions")
const roles = require("./routes/createRoles")

dbConnection()

const cors = require('cors');
app.use(cors({
  origin: 'https://erp-system-pied.vercel.app',
  methods: ['GET', 'POST','PUT','DELETE'], // Include other methods as needed
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())
app.use("/auth", auth)
app.use("/product", product)
app.use("/customer", customer)
app.use("/customerSale", customerSale)
app.use("/employees", employee)
app.use("/attendance", attendance)
app.use("/saleTrail", salesTrails)
app.use("/vendor", vendor)
app.use("/venderTrail", vendorTrails)
app.use("/salary", salary)
app.use("/entries", accountEntries)
app.use("/revenue", profit)
app.use("/prophet", prophet)
app.use("/roles", roles)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
