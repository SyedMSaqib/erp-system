const express = require("express")
const router = express.Router()
const validator = require("../middleware/validator")
const employee = require("../models/employee")
const { check, validationResult } = require("express-validator")

// Add Employee
router.post(
  "/addEmployee",
  [check("name").isLength({ min: 3 }), check("phone").isLength({ min: 3 }), check("email").isLength({ min: 3 }),check("basePay").isLength({ min: 3 })],
  validator,
  async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) return res.json(result)
    try {
      if (req.user == null) return res.status(404).send("Invalid token, or empty")
      const { name, email, phone, basePay } = req.body
      const newEmployee = await employee.create({
        user: req.user.id,
        name: name,
        email: email,
        phone: phone,
        basePay:basePay
      })
      res.json(newEmployee)
    } catch (err) {
      res.status(500).json(err)
    }
  }
)

// Fetch All Employees
router.get("/fetchAllEmployees", validator, async (req, res) => {
  try {
    const EmployeesFromDb = await employee.find({ user: req.user.id })
    res.json(EmployeesFromDb)
  } catch (err) {
    res.json(err)
  }
})

// Delete Employee
router.delete("/deleteEmployee/:id", validator, async (req, res) => {
  const id = req.params.id
  if (id === null) return res.status(500).send("Input correct id")

  try {
    const employeeFromDb = await employee.findById(id)
    if (!employeeFromDb) return res.status(404).json("No such employee exists")

    if (employeeFromDb.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user")
    const employeeDelete = await employee.findByIdAndDelete(id)

    res.json(employeeDelete)
  } catch (err) {
    res.json(`${err}`)
  }
})

// Update Employee
router.put("/updateEmployee/:id", validator, async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty()) return res.json(result)
  const id = req.params.id
  if (id === null) return res.status(500).send("Input correct id")

  try {
    const EmployeeFromDb = await employee.findById(id)
    if (!EmployeeFromDb) return res.status(404).json("No such employee exists")

    if (EmployeeFromDb.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user")
    const { name, email, phone, basePay } = req.body
    const newEmployee = {}
    if (name) newEmployee.name = name
    if (email) newEmployee.email = email
    if (phone) newEmployee.phone = phone
    if (basePay) newEmployee.basePay = basePay
    const employeeUpdate = await employee.findByIdAndUpdate(id, { $set: newEmployee }, { new: true })

    res.json(employeeUpdate)
  } catch (err) {
    res.json(`${err}`)
  }
})

module.exports = router
