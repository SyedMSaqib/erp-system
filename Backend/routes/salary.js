const express = require("express");
const router = express.Router();
const validator = require("../middleware/validator");
const Salary = require("../models/salary");
const { check, validationResult } = require("express-validator");
const employee= require("../models/employee")
// Add Salary
router.post(
  "/addSalary",
  [
    check("Month").isLength({ min: 1 }),
    check("days").isNumeric(),
    
  ],
  validator,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.json(result);

    try {
      if (req.user == null) return res.status(404).send("Invalid token or empty");
      const {Month,days } = req.body;
      const employees=await employee.find({user:req.user.id})
      
      for (const emp of employees) {
        const { name, basePay,_id } = emp;

        const monthlyPay = basePay * days;

        await Salary.create({
          user: req.user.id,
          employeeName: name,
          employeeId: _id,
          Month: Month,
          basePay: basePay,
          monthlyPay: monthlyPay,
        });
      }
      res.json({ message: "Salaries created successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// Fetch All Salaries
router.get("/fetchAllSalaries", validator, async (req, res) => {
  try {
    const salariesFromDb = await Salary.find({ user: req.user.id });
    res.json(salariesFromDb);
  } catch (err) {
    res.json(err);
  }
});

// Delete Salary
router.delete("/deleteSalary/:id", validator, async (req, res) => {
  const id = req.params.id;
  if (id === null) return res.status(500).send("Input correct id");

  try {
    const salaryFromDb = await Salary.findById(id);
    if (!salaryFromDb) return res.status(404).json("No such salary exists");

    if (salaryFromDb.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user");
    const salaryDelete = await Salary.findByIdAndDelete(id);

    res.json(salaryDelete);
  } catch (err) {
    res.json(`${err}`);
  }
});

// Update Salary
router.put("/updateSalary/:id", validator, async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.json(result);

  const id = req.params.id;
  if (id === null) return res.status(500).send("Input correct id");

  try {
    const salaryFromDb = await Salary.findById(id);
    if (!salaryFromDb) return res.status(404).json("No such salary exists");

    if (salaryFromDb.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user");
    const { employeeName, employeeId, Month, basePay, monthlyPay } = req.body;

    const newSalary = {};
    if (employeeName) newSalary.employeeName = employeeName;
    if (employeeId) newSalary.employeeId = employeeId;
    if (Month) newSalary.Month = Month;
    if (basePay) newSalary.basePay = basePay;
    if (monthlyPay) newSalary.monthlyPay = monthlyPay;

    const salaryUpdate = await Salary.findByIdAndUpdate(id, { $set: newSalary }, { new: true });

    res.json(salaryUpdate);
  } catch (err) {
    res.json(`${err}`);
  }
});

module.exports = router;
