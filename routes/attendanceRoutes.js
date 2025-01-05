const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

// Route to mark attendance
router.post("/mark-attendance", attendanceController.markAttendance);

// Route to update attendance
router.put("/update-attendance", attendanceController.updateAttendance);

// Route to get all attendance records
router.get("/all", attendanceController.getAllAttendance);

module.exports = router;
