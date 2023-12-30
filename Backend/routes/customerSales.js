const express = require("express")
const router = express.Router()
const validator = require("../middleware/validator")
const customerSale = require("../models/sales")
const Product = require("../models/product")
const salesTrail = require("../models/salesTrails")
const ledger = require("../models/ledger")
const receivable = require("../models/receivable")

const { check, validationResult } = require("express-validator")

router.post("/addCustomerSales", [check("quantity").isLength({ min: 1 })], validator, async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty()) return res.json(result)
  try {
    if (req.user == null) return res.status(404).send("Invalid token, or empty")
    const { customerId, product, quantity, customerName, productId, paid } = req.body
    if(req.user.role==="admin"||req.user.role==="cashier")
      {
    const productDetails = await Product.findById(productId)
    if (productDetails.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user")
    const requestedQuantity = parseInt(quantity, 10)
    if (!productDetails || productDetails.quantity < requestedQuantity) {
      return res.status(400).json({ error: "Insufficient stock or invalid product." })
    }
    productDetails.quantity -= quantity
    await productDetails.save()

    const newCustomersale = await customerSale.create({
      user: req.user.id,
      customerId: customerId,
      quantity: quantity,
      product: product,
      customerName: customerName,
      productId: productId,
    })
    const saleAmount = quantity * productDetails.price
    const profit= saleAmount-(quantity* productDetails.vendorPrice)
    if (paid) {
      await salesTrail.create({
        user: req.user.id,
        customerId: customerId,
        customerName: customerName,
        saleId: newCustomersale.id,
        saleAmount: saleAmount,
        productName: product,
        productQuantity: quantity,
        singleUnitPrice: productDetails.price,
        paid: true,
        profit:profit
      })
      await ledger.create({
        user: req.user.id,
        journalEntry: "dr",
        Description: "Sale",
        amount: productDetails.price * quantity,
        TransactionId: newCustomersale.id,
      })
    } else {
      await salesTrail.create({
        user: req.user.id,
        customerId: customerId,
        customerName: customerName,
        saleId: newCustomersale.id,
        saleAmount: saleAmount,
        productName: product,
        productQuantity: quantity,
        singleUnitPrice: productDetails.price,
        paid: false,
        profit:profit
      })
      await receivable.create({
        user: req.user.id,
        journalEntry: "dr",
        Description: "Sale",
        amount: productDetails.price * quantity,
        saleId: newCustomersale.id,
      })
    }

    res.json(newCustomersale)
  }
  } catch (err) {
    res.status(500).json(err)
  }
})
router.get("/fetchAllCustomerSale", validator, async (req, res) => {
  try {
    if(req.user.role==="admin"||req.user.role==="sales manager")
      {
    const CustomerSalesFromDb = await customerSale.find({ user: req.user.id })

    res.json(CustomerSalesFromDb)
  }
} catch (err) {
    res.json(err)
  }
})

router.delete("/deleteCustomerSale/:id", validator, async (req, res) => {
  const id = req.params.id
  if (id === null) return res.status(500).send("input correct id")

  try {
    if(req.user.role==="admin"||req.user.role==="sales manager")
    {
    const CustomerSalesFromDb = await customerSale.findById(id)
    if (!CustomerSalesFromDb) return res.status(404).json("No such customer exists")

    if (CustomerSalesFromDb.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user")

    const customerProductId = await customerSale.findById(id)

    const productDetails = await Product.findById(customerProductId.productId)
    const returnQuantity = parseInt(CustomerSalesFromDb.quantity, 10)
    if (productDetails) {
      productDetails.quantity = +productDetails.quantity + returnQuantity
      await productDetails.save()

      if (productDetails.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user")
    }
    const customerSaleDelete = await customerSale.findByIdAndDelete(id)
    const salesTrailRecord = await salesTrail.findOne({ saleId: id })
    const receivableRecord = await receivable.findOne({ saleId: id })
    if (!receivableRecord) {
      await ledger.create({
        user: req.user.id,
        journalEntry: "rr",
        Description: "Sale Refund",
        amount: -salesTrailRecord.saleAmount,
        TransactionId: salesTrailRecord.saleId,
      })
    } else {
      if (!salesTrailRecord.paid) {
        await receivable.create({
          user: req.user.id,
          journalEntry: "rr",
          Description: "Sale Refund",
          amount: -salesTrailRecord.saleAmount,
          saleId: id,
        })
      } else {
        await ledger.create({
          user: req.user.id,
          journalEntry: "rr",
          Description: "Sale Refund",
          amount: -salesTrailRecord.saleAmount,
          TransactionId: salesTrailRecord.saleId,
        })
      }
    }
    if (salesTrailRecord) {
      await salesTrail.findByIdAndDelete(salesTrailRecord._id)
    }

    res.json(customerSaleDelete)
  } 
}catch (err) {
    res.json(`${err}`)
  }
})

router.put("/updateCustomerSale/:id", validator, async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty()) return res.json(result)
  const id = req.params.id
  if (id === null) return res.status(500).send("input correct id")

  try {
    if(req.user.role==="admin"||req.user.role==="sales manager")
    {
    const CustomerSalesFromDb = await customerSale.findById(id)
    if (!CustomerSalesFromDb) return res.status(404).json("No such Customer exists")

    if (CustomerSalesFromDb.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user")
    const { customer, quantity, product } = req.body
    const newSale = {}
    if (customer) newSale.customer = customer
    if (quantity) newSale.quantity = quantity
    if (product) newSale.product = product
    const customerUpdate = await customerSale.findByIdAndUpdate(id, { $set: newSale }, { new: true })

    res.status(200).json(customerUpdate)
  } 
}
  catch (err) {
    res.json(`${err}`)
  }
})

module.exports = router
