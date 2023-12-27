const express = require("express")
const router = express.Router()
const roles = require("../models/roles")
const { check, validationResult } = require("express-validator")
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const key="02192000"
var salt = bcrypt.genSaltSync(10);
const validator=require('./../middleware/validator')

router.post("/createRole", validator,[ check("password").isLength({ min: 8 })], async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) return res.status(500).json(result)
  
    try{
        
      if (req.user == null) return res.status(404).send("Invalid token, or empty")
    const { role, password } = req.body

      let role_exists = await roles.findOne({ email: req.user.email, role:role });
      if (role_exists !== null) {
        return res.status(403).send({ error: `${role_exists.role} already exists`,status:403});
      }
      
      else{
  
    var hashedPassword = bcrypt.hashSync(password, salt);
  
    await roles.create({
      role:role,
      email: req.user.email,
      password: hashedPassword,
    })
    role_exists={
      user:{
        id:req.user.id,
        role:role
      }
    }
  
    var token = jwt.sign(role_exists,key);
  }
    
   return res.status(200).json({token:token,status:200})
    }
    catch(err)
    {
        res.status(500).json({err})
       
    }
}
)
module.exports = router
