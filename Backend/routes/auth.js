const express = require("express")
const router = express.Router()
const user = require("../models/users")
const roles = require("../models/roles")
const { check, validationResult } = require("express-validator")
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const key="02192000"
var salt = bcrypt.genSaltSync(10);

//Signup authentication
router.post("/signup", [check("name").isLength({min:3}),check("email").isEmail(), check("password").isLength({ min: 8 })], async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) return res.status(500).json(result)
  
    try{
      let checkUser = await user.findOne({ email: req.body.email });
      if (checkUser !== null) {
        return res.status(403).send({ error: `${checkUser.email} already exists`,status:403});
      }
      
      else{
    const { name, email, password } = req.body
    var hashedPassword = bcrypt.hashSync(password, salt);
  
    const newUser=await user.create({
      name:name,
      email: email,
      password: hashedPassword,
    })
    checkUser={
      user:{
        id:newUser.id
      }
    }
  
    var token = jwt.sign(checkUser,key);
  }
    
   return res.status(200).json({token:token,status:200})
    }
    catch(err)
    {
        res.status(500).json({err})
       
    }
}
)

//Login authentication
router.post("/login",[check("email").isEmail(), check("password").isLength({ min: 6 })], async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty()) return res.status(500).json(result)
  const {email}=req.body
const role="admin"
if(role==="admin")
{
  let checkUser = await user.findOne({email:email})
  if(checkUser===null)
  return res.status(400).send({error:"Email does not match",status:400})
  const password=checkUser.password  
  const compare=bcrypt.compareSync(req.body.password,password )
  const User={
    user:{
      id:checkUser.id,
      email:checkUser.email,
      role:role
    }
  }

  var token = jwt.sign(User,key);
  if(compare)
  return res.status(200).json({
    token: token,
    name: checkUser.name,
    role:role,
    status:200
  });  
  return res.status(401).send({error:"Password does not match",status:401})
  

}
else
{
  let checkUser = await roles.findOne({email:email,role:role})
  if(checkUser===null)
  return res.status(400).send({error:"Email does not match",status:400})
  let checkAccount = await user.findOne({email:email})
  if(checkAccount)
  {
  const password=checkUser.password  
  const compare=bcrypt.compareSync(req.body.password,password )
  const User={
    user:{
      id:checkAccount.id,
      email:checkUser.email,
      role:role
    }
  }

  var token = jwt.sign(User,key);
  if(compare)
  return res.status(200).json({
    token: token,
    name: role,
    role:role,
    status:200
  });  }
  else
  {
    return res.send("we can't find the parent account")
  }
  return res.status(401).send({error:"Password does not match",status:401})
  

}
}
)


module.exports = router
