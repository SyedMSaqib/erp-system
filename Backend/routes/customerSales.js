const express = require("express")
const router = express.Router()
const validator = require("../middleware/validator")
const customerSale = require("../models/sales")
const Product=require("../models/product")

const { check, validationResult } = require("express-validator")


router.post(
  "/addCustomerSales",
  [
    check("quantity").isLength({ min: 1 }),
  ],
  validator,
  async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) return res.json(result)
    try {
      if (req.user == null) return res.status(404).send("Invalid token, or empty")
      const {customerId,product,quantity,customerName,productId} = req.body
      
      const productDetails = await Product.findById(productId);
      if (productDetails.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user")
      const requestedQuantity = parseInt(quantity, 10);
      if (!productDetails || productDetails.quantity < requestedQuantity) {
        return res.status(400).json({ error: "Insufficient stock or invalid product." });
      }
      productDetails.quantity -= quantity;
      await productDetails.save();


      const newCustomersale = await customerSale.create({
        user: req.user.id,
        customerId: customerId,
        quantity: quantity,
        product:product,
        customerName:customerName,
        productId:productId
      })
      res.json(newCustomersale)
    } catch (err) {
      res.status(500).json(err)
    }
  }
)
router.get("/fetchAllCustomerSale", validator, async (req, res) => {
    try {
      const CustomerSalesFromDb = await customerSale.find({ user: req.user.id })
  
      res.json(CustomerSalesFromDb)
    } catch (err) {
      res.json(err)
    }
  })

  router.delete("/deleteCustomerSale/:id", validator, async (req, res) => {
    const id = req.params.id
    if (id === null) return res.status(500).send("input correct id")
  
    try {
      const CustomerSalesFromDb = await customerSale.findById(id)
      if (!CustomerSalesFromDb) return res.status(404).json("No such customer exists")
  
      if (CustomerSalesFromDb.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user")
      const customerSaleDelete = await customerSale.findByIdAndDelete(id)
  
      res.json(customerSaleDelete)
    } catch (err) {
      res.json(`${err}`)
    }
  })
  
  
  router.put("/updateCustomerSale/:id",
  validator,
  async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) return res.json(result)
    const id = req.params.id
    if (id === null) return res.status(500).send("input correct id")
  
    try {
      const CustomerSalesFromDb = await customerSale.findById(id)
      if (!CustomerSalesFromDb) return res.status(404).json("No such Customer exists")
  
      if (CustomerSalesFromDb.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user")
      const {customer,quantity,product}=req.body
      const newSale={}
      if(customer)
      newSale.customer=customer
      if(quantity)
      newSale.quantity=quantity
      if(product)
      newSale.product=product
      const customerUpdate = await customerSale.findByIdAndUpdate(id,{$set:newSale},{new:true})
  
      res.status(200).json(customerUpdate)
    } catch (err) {
      res.json(`${err}`)
    }
  })
  



module.exports = router
