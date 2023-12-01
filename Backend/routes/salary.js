const express = require("express")
const router = express.Router()
const validator = require("../middleware/validator")
const Salary = require("../models/salary")
const { check, validationResult } = require("express-validator")
const employee = require("../models/employee")
const Attendance = require("../models/attendance")

router.post(
  "/addSalary",
  [check("Month").isLength({ min: 1 }), check("days").isNumeric()],
  validator,
  async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) return res.json(result)

    try {
      if (req.user == null) return res.status(404).send("Invalid token or empty")
      const { Month, days } = req.body
      const employees = await employee.find({ user: req.user.id })
      const checkAlreadyMonth = await Salary.findOne({ Month: Month })

      if (checkAlreadyMonth) return res.status(400).send("Already Paid this month")

      for (const emp of employees) {
        const { name, basePay, _id } = emp

        const monthlyPay = basePay * days

        await Salary.create({
          user: req.user.id,
          employeeName: name,
          employeeId: _id,
          Month: Month,
          basePay: basePay,
          monthlyPay: monthlyPay,
        })
      }
      return res.status(202).json({ message: "Salaries created successfully" })
    } catch (err) {
      return res.status(500).json(err)
    }
  }
)

router.post("/monthRecord", [check("Month").isLength({ min: 1 })], validator, async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty()) return res.json(result)
  try {
    if (req.user == null) return res.status(404).send("Invalid token or empty")

    const { Month } = req.body

    const salariesRecord = await Salary.find({ user: req.user.id, Month: Month })
    if (salariesRecord.length !== 0) {
      res.json({ salariesRecord, status: 200 })
    } else res.json({ message: "No record available for this month", status: 400 })
  } catch (err) {
    res.json(err)
  }
})
router.post(
  "/absenceSalaryDeduct",
  [check("addRecord").isBoolean(), check("Month").isString()],
  validator,
  async (req, res) => {
    if (req.user == null) return res.status(404).send("Invalid token or empty")
    const monthNameToNumber = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
    }
    try {
      const { addRecord, Month } = req.body
      const monthInNumber = monthNameToNumber[Month]

      const attendanceFromDb = await Attendance.find({ user: req.user.id })
      const EmployeesFromDb = await employee.find({ user: req.user.id })
      const desiredMonthSalaries = attendanceFromDb.filter((attendanceFromDb) => {
        const salaryDate = new Date(attendanceFromDb.date)
        return salaryDate.getMonth() === monthInNumber
      })
      const deductedPEmployee = []

      for (const emp of EmployeesFromDb) {
        const result = desiredMonthSalaries.filter(
          (attendance) => attendance.employeeId.toString() === emp._id.toString()
        )
        var days = 0
        var monthlySalary = 0
        for (const presdays of result) {
          if (presdays.attendance) {
            days++
          }
        }
        monthlySalary = emp.basePay * days
        deductedPEmployee.push({
          employeeName: emp.name,
          employeeId: emp._id,
          Month: Month,
          daysWorked: days,
          MonthlyPay: monthlySalary,
        })

        if (addRecord === true) {
          await Salary.create({
            user: req.user.id,
            employeeName: emp.name,
            employeeId: emp._id,
            Month: Month,
            basePay: emp.basePay,
            monthlyPay: monthlySalary,
          })
        }
      }
      return res.json(deductedPEmployee)
    } catch (err) {
      res.json(err)
    }
  }
)
router.get("/fetchAllSalaries", validator, async (req, res) => {
  try {
    const { Month, days } = req.body

    const salariesFromDb = await Salary.find({ user: req.user.id })
    res.json(salariesFromDb)
  } catch (err) {
    res.json(err)
  }
})

// Delete Salary
router.delete("/deleteSalary/:id", validator, async (req, res) => {
  const id = req.params.id
  if (id === null) return res.status(500).send("Input correct id")

  try {
    const salaryFromDb = await Salary.findById(id)
    if (!salaryFromDb) return res.status(404).json("No such salary exists")

    if (salaryFromDb.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user")
    const salaryDelete = await Salary.findByIdAndDelete(id)

    res.json(salaryDelete)
  } catch (err) {
    res.json(`${err}`)
  }
})

// Update Salary
router.put("/updateSalary/:id", validator, async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty()) return res.json(result)

  const id = req.params.id
  if (id === null) return res.status(500).send("Input correct id")

  try {
    const salaryFromDb = await Salary.findById(id)
    if (!salaryFromDb) return res.status(404).json("No such salary exists")

    if (salaryFromDb.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user")
    const { employeeName, employeeId, Month, basePay, monthlyPay } = req.body

    const newSalary = {}
    if (employeeName) newSalary.employeeName = employeeName
    if (employeeId) newSalary.employeeId = employeeId
    if (Month) newSalary.Month = Month
    if (basePay) newSalary.basePay = basePay
    if (monthlyPay) newSalary.monthlyPay = monthlyPay

    const salaryUpdate = await Salary.findByIdAndUpdate(id, { $set: newSalary }, { new: true })

    res.json(salaryUpdate)
  } catch (err) {
    res.json(`${err}`)
  }
})

module.exports = router
