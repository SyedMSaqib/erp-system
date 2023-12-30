const express = require("express")
const router = express.Router()
const validator = require("../middleware/validator")
const product = require("../models/product")
const ledger = require("../models/ledger")
const payable = require("../models/payable")
const venderTrails = require("../models/venderTrails")
const { check, validationResult } = require("express-validator")

router.post(
  "/add",
  [
    check("name").isLength({ min: 3 }),
    check("description").isLength({ min: 1 }),
    check("category").isLength({ min: 3 }),
    check("quantity").isLength({ min: 1 }),
    check("price").isLength({ min: 1 }),
    check("vendor").isLength({ min: 1 }),
    check("vendorPrice").isLength({ min: 1 }),
  ],
  validator,
  async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) return res.json(result)
    try {
      if (req.user == null) return res.status(404).send("Invalid token, or empty")
      const { name, description, category, price, quantity, vendorPrice, vendor, vendorId, paid } = req.body
      if(req.user.role==="admin"||req.user.role==="inventory manager")
      {
      const newProduct = await product.create({
        user: req.user.id,
        name: name,
        description: description,
        category: category,
        price: price,
        quantity: quantity,
        vendor: vendor,
        vendorPrice: vendorPrice,
        vendorId: vendorId,
      })

      const purchaseAmount = quantity * vendorPrice
      if (paid) {
        await venderTrails.create({
          user: req.user.id,
          venderId: vendorId,
          venderName: vendor,
          productId: newProduct._id,
          purchaseAmount: purchaseAmount,
          productName: name,
          productQuantity: quantity,
          singleUnitPrice: vendorPrice,
          paid: true,
        })
        await ledger.create({
          user: req.user.id,
          journalEntry: "cr",
          Description: "Purchase",
          amount: -(vendorPrice * quantity),
          TransactionId: newProduct.id.toString(),
        })
      } else {
        await venderTrails.create({
          user: req.user.id,
          venderId: vendorId,
          venderName: vendor,
          productId: newProduct._id,
          purchaseAmount: purchaseAmount,
          productName: name,
          productQuantity: quantity,
          singleUnitPrice: vendorPrice,
          paid: false,
        })
        await payable.create({
          user: req.user.id,
          journalEntry: "cr",
          Description: "Purchase",
          amount: -(vendorPrice * quantity),
          id: newProduct._id,
        })
      }

      res.json(newProduct)
    }
    } catch (err) {
      res.status(500).json(err)
    }
  }
)

router.get("/fetchAll", validator, async (req, res) => {
  try {
    if(req.user.role==="admin"||req.user.role==="inventory manager")
{
    const productFromDb = await product.find({ user: req.user.id })

    res.json(productFromDb)
  } 
}catch (err) {
    res.json(err)
  }
})

router.delete("/delete/:id", validator, async (req, res) => {
  const id = req.params.id
  if (id === null) return res.status(500).send("input correct id")

  try {
    if(req.user.role==="admin"||req.user.role==="inventory manager")
    {
    const productFromDb = await product.findById(id)
    if (!productFromDb) return res.status(404).json("No such product exists")

    if (productFromDb.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user")
    const productDelete = await product.findByIdAndDelete(id)

    const VenderTrailRecord = await venderTrails.findOne({ productId: id })
    if (VenderTrailRecord) {
      await venderTrails.findByIdAndDelete(VenderTrailRecord._id)
      if(VenderTrailRecord.paid)
      {
        await ledger.create({
          user: req.user.id,
          journalEntry: "rr",
          Description: "Purchase Return",
          amount: VenderTrailRecord.purchaseAmount,
          TransactionId: id,
        })
       
      }
      else{
        await payable.create({
          user: req.user.id,
          journalEntry: "rr",
          Description: "Purchase Return",
          amount: (VenderTrailRecord.purchaseAmount),
          id: id,
        })
      }
      
    }

    res.json(productDelete)
  }
} catch (err) {
    res.json(`${err}`)
  }
})

router.put("/update/:id", validator, async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty()) return res.json(result)
  const id = req.params.id
  if (id === null) return res.status(500).send("input correct id")

  try {
    if(req.user.role==="admin"||req.user.role==="inventory manager")
    {
    const productFromDb = await product.findById(id)
    if (!productFromDb) return res.status(404).json("No such product exists")

    if (productFromDb.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user")
    const { name, description, category, price, quantity } = req.body
    const newProduct = {}
    if (name) newProduct.name = name
    if (description) newProduct.description = description
    if (category) newProduct.category = category
    if (price) newProduct.price = price
    if (quantity) newProduct.quantity = quantity
    const productUpdate = await product.findByIdAndUpdate(id, { $set: newProduct }, { new: true })

    res.json(productUpdate)
  } 
}catch (err) {
    res.json(`${err}`)
  }
})

module.exports = router
