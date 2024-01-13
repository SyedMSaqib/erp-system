const express = require("express")
const router = express.Router()
const roles = require("../models/roles")
const { check, validationResult } = require("express-validator")
var bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")
const key = "02192000"
var salt = bcrypt.genSaltSync(10)
const validator = require("./../middleware/validator")

router.post(
  "/createRole",
  validator,
  [check("password").isLength({ min: 8 }), check("email").isEmail()],
  async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) return res.status(500).json(result)
    try {
      if (req.user == null)
        return res.status(404).send("Invalid token, or empty")
      const { role, password, email } = req.body

      let role_exists = await roles.findOne({ email: email, role: role })
      if (role_exists !== null) {
        return res
          .status(403)
          .send({ error: `${role_exists.role} already exists`, status: 403 })
      } else {
        var hashedPassword = bcrypt.hashSync(password, salt)

        await roles.create({
          role: role,
          email: email,
          password: hashedPassword,
          parent_id: req.user.id,
        })
        // role_exists={
        //   user:{
        //     id:req.user.id,
        //     role:role
        //   }
        // }

        // var token = jwt.sign(role_exists,key);
      }

      return res
        .status(200)
        .json({ Msg: "Role created successfully", status: 200 })
    } catch (err) {
      res.status(500).json({ err })
    }
  }
)
router.get("/getRoles", validator, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const Roles = await roles.find({ parent_id: req.user.id })
      const Roles_without_Password = Roles.map((roles) => ({
        access: roles.access,
        id: roles.id,
        role: roles.role,
        email: roles.email,
        pearent_id: roles.parent_id,
      }))

      return res.json(Roles_without_Password)
    }
  } catch (err) {
    res.json(err)
  }
})
router.delete("/deleteRole/:id", validator, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const id = req.params.id
      if (req.user == null)
        return res.status(400).json({ msg: "Invalid token", status: 400 })
      const role_Exist = await roles.findById(id)
      
      if (role_Exist) {
        await roles.findByIdAndDelete(id)
        return res.status(200).json({ msg: "Success", status: 400 })
      } 
        return res.status(400).json({ msg: "No such role exist", status: 401 })
      
    }
  } catch (err) {
     res.send(500).json("Some error occurred")
  }
})

module.exports = router
