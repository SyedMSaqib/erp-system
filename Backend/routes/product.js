const express = require("express")
const router = express.Router()
const validator = require("../middleware/validator")
const product = require("../models/product")
const { check, validationResult } = require("express-validator")

router.post(
  "/add",
  [
    check("name").isLength({ min: 3 }),
    check("description").isLength({ min: 3 }),
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
      const { name, description, category, price, quantity,vendorPrice,vendor } = req.body
      const newProduct = await product.create({
        user: req.user.id,
        name: name,
        description: description,
        category: category,
        price: price,
        quantity:quantity,
        vendor: vendor,
        vendorPrice: vendorPrice
      })
      res.json(newProduct)
    } catch (err) {
      res.status(500).json(err)
    }
  }
)

router.get("/fetchAll", validator, async (req, res) => {
  try {
    const productFromDb = await product.find({ user: req.user.id })

    res.json(productFromDb)
  } catch (err) {
    res.json(err)
  }
})

router.delete("/delete/:id", validator, async (req, res) => {
  const id = req.params.id
  if (id === null) return res.status(500).send("input correct id")

  try {
    const productFromDb = await product.findById(id)
    if (!productFromDb) return res.status(404).json("No such product exists")

    if (productFromDb.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user")
    const productDelete = await product.findByIdAndDelete(id)

    res.json(productDelete)
  } catch (err) {
    res.json(`${err}`)
  }
})


router.put("/update/:id",
validator,
async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty()) return res.json(result)
  const id = req.params.id
  if (id === null) return res.status(500).send("input correct id")

  try {
    const productFromDb = await product.findById(id)
    if (!productFromDb) return res.status(404).json("No such product exists")

    if (productFromDb.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user")
    const {name,description,category,price,quantity}=req.body
    const newProduct={}
    if(name)
    newProduct.name=name
    if(description)
    newProduct.description=description
    if(category)
    newProduct.category=category
    if(price)
    newProduct.price=price
    if(quantity)
    newProduct.quantity=quantity
    const productUpdate = await product.findByIdAndUpdate(id,{$set:newProduct},{new:true})

    res.json(productUpdate)
  } catch (err) {
    res.json(`${err}`)
  }
})


module.exports = router
