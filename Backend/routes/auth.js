const express = require('express')
const router = express.Router()
const user=require("../models/users")
const { query, validationResult } = require('express-validator');


//Signup authentication
router.get('/auth/signup',query("name").notEmpty,query("email").isEmail,query("password").isLength({min:6})
 ,async(req, res) => {
    const result= validationResult(req)
    if(result)
        return res.status(401).send("Provide correct data for all fields")
    
    const checkUser=await user.findOne(req.body.email)
    if(checkUser)
    res.send.status(403).send.json({"error":"User already exists"})
    const {name,email,password}=req.body
    

    
  
})


module.exports = router