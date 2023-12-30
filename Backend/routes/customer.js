const express = require("express")
const router = express.Router()
const validator = require("../middleware/validator")
const customer = require("../models/customer")
const { check, validationResult } = require("express-validator")

router.post(
  "/addCustomer",
  [
    check("name").isLength({ min: 3 }),
    check("phone").isLength({ min: 3 }),
    check("email").isLength({ min: 3 })
  ],
  validator,
  async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) return res.json(result)
    try {
      if (req.user == null) return res.status(404).send("Invalid token, or empty")
      if(req.user.role==="admin"||req.user.role==="sales manager")
      {
      const { name, email, phone, } = req.body
      const newCustomer = await customer.create({
        user: req.user.id,
        name: name,
        email: email,
        phone:phone,
      })
      res.json(newCustomer)
    }
  } catch (err) {
      res.status(500).json(err)
    }
  }
)
router.get("/fetchAllCustomer", validator, async (req, res) => {
    try {
      console.log(req.user)
      if(req.user.role==="admin"||req.user.role==="sales manager")
      {
      const CustomerFromDb = await customer.find({ user: req.user.id })
  
      res.json(CustomerFromDb)
    } 
  }catch (err) {
      res.json(err)
    }
  })

  router.delete("/deleteCustomer/:id", validator, async (req, res) => {
    const id = req.params.id
    if (id === null) return res.status(500).send("input correct id")
  
    try {
      if(req.user.role==="admin"||req.user.role==="sales manager")
      {
      const customerFromDb = await customer.findById(id)
      if (!customerFromDb) return res.status(404).json("No such customer exists")
  
      if (customerFromDb.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user")
      const customerDelete = await customer.findByIdAndDelete(id)
  
      res.json(customerDelete)
    }
   } catch (err) {
      res.json(`${err}`)
    }
  })
  
  
  router.put("/updateCustomer/:id",
  validator,
  async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) return res.json(result)
    const id = req.params.id
    if (id === null) return res.status(500).send("input correct id")
  
    try {
    
      if(req.user.role==="admin"||req.user.role==="sales manager")
      {
      const CustomerFromDb = await customer.findById(id)
      if (!CustomerFromDb) return res.status(404).json("No such Customer exists")
  
      if (CustomerFromDb.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user")
      const {name,email,phone}=req.body
      const newCustomer={}
      if(name)
      newCustomer.name=name
      if(email)
      newCustomer.email=email
      if(phone)
      newCustomer.phone=phone
      const customerUpdate = await customer.findByIdAndUpdate(id,{$set:newCustomer},{new:true})
  
      res.json(customerUpdate)
    }
   }
    catch (err) {
      res.json(`${err}`)
    }
  })
  



module.exports = router
