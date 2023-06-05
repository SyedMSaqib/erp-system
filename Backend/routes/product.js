const express = require('express')
const router = express.Router()
const validator=require("../middleware/validator")
const product=require("../models/product")
const { check, validationResult } = require("express-validator")


router.post('/add', [check("name").isLength({min:3}),check("description").isLength({min:3}), check("category").isLength({ min: 3 })], validator,async(req, res) => {
  const result=validationResult(req)
  if(!result.isEmpty())
  return res.json(result)
  try{
  if(req.user==null)
  return res.status(404).send("Invalid token, or empty")
  const {name,description,category}=req.body
  const newProduct=await product.create({
    user:req.user.id,
    name:name,
    description:description,
    category:category
  })  
  res.json(newProduct)
  }
  catch(err)
  {
    res.status(500).json(err)
  }

})

router.post('/fetchAll', validator,async(req, res) => {
  
  try{
    const productFromDb=await product.find({user:req.user.id})
    
  res.json(productFromDb)
  }
  catch(err)
  {
    res.json(err)
  }
})



module.exports = router