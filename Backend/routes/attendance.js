const express = require("express");
const router = express.Router();
const validator = require("../middleware/validator");
const Attendance = require("../models/attendance");
const { check, validationResult } = require("express-validator");

// Create a new attendance record
router.post(
  "/addAttendance",
  [
    check("employeeId").notEmpty(),
    check("name").notEmpty(),
    check("attendance").isBoolean(),
    check("date").notEmpty(),
  ],
  validator,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.json(result);

    try {
      if(req.user.role==="admin"||req.user.role==="hr")
      {
      const { employeeId, name, attendance, date } = req.body;
      if (req.user == null) return res.status(404).send("Invalid token or empty");
      
      const existingRecord = await Attendance.findOne({ employeeId: employeeId, date });

      if (existingRecord) {
        const UpdatedAttendance={
          
          employeeId,
          name,
          attendance,
          date
        }

        const attendanceUpdate = await Attendance.findOneAndUpdate(
          { employeeId, date },
          { $set: UpdatedAttendance },
          { new: true }
        );
        
       
    
       return res.json({updated:true});
      }

     
      const newAttendance = await Attendance.create({
        user: req.user.id,
        employeeId,
        name,
        attendance,
        date

      });
      res.json(newAttendance);
    }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// Retrieve all attendance records for a user
router.get("/fetchAllAttendance", validator, async (req, res) => {
  try {
    if(req.user.role==="admin"||req.user.role==="hr")
      {
    const attendanceFromDb = await Attendance.find({ user: req.user.id });
    res.json(attendanceFromDb);
      }
  } catch (err) {
    res.json(err);
  }
});

// Delete an attendance record by ID
router.delete("/deleteAttendance/:id", validator, async (req, res) => {
  const id = req.params.id;
  if (id === null) return res.status(500).send("Input correct ID");

  try {
    if(req.user.role==="admin"||req.user.role==="hr")
      {
    const attendanceFromDb = await Attendance.findById(id);
    if (!attendanceFromDb) return res.status(404).json("No such attendance record exists");

    if (attendanceFromDb.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user");

    const attendanceDelete = await Attendance.findByIdAndDelete(id);
    res.json(attendanceDelete);
      }
  } catch (err) {
    res.json(`${err}`);
  }
});

// Update an attendance record by ID
router.put("/updateAttendance/:id", validator, async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.json(result);
  const id = req.params.id;
  if (id === null) return res.status(500).send("Input correct ID");

  try {
    const attendanceFromDb = await Attendance.findById(id);
    if (!attendanceFromDb) return res.status(404).json("No such attendance record exists");

    if (attendanceFromDb.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user");

    const { employeeId, name, attendance } = req.body;
    const newAttendance = {};

    if (employeeId) newAttendance.employeeId = employeeId;
    if (name) newAttendance.name = name;
    if (attendance !== undefined) newAttendance.attendance = attendance;

    const attendanceUpdate = await Attendance.findByIdAndUpdate(
      id,
      { $set: newAttendance },
      { new: true }
    );

    res.json(attendanceUpdate);
  } catch (err) {
    res.json(`${err}`);
  }
});

module.exports = router;
