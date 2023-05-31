const express = require("express")
const router = express.Router()
const user = require("../models/users")
const { check, validationResult } = require("express-validator")

//Signup authentication
router.post("/signup", [check("name").isLength({min:3}),check("email").isEmail(), check("password").isLength({ min: 6 })], async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) return res.json(result)
  
    try{
    const checkUser = await user.findOne({email:req.body.email})
    if (checkUser) 
    return res.status(403).send({ error:`${checkUser.email} already exists` })
    const { name, email, password } = req.body
    console.log(name+email+password)

    const newUser=await user.create({
      name:name,
      email: email,
      password: password,
    })
    res.json({newUser})
    console.log({newUser})
    }
    catch(err)
    {
        res.json({err})
       
    }

}
)

module.exports = router
