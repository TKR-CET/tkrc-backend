const express = require("express");
const {
  markAttendance,
  fetchAttendance,
  checkAttendance,
  deleteAttendance,
} = require("../controllers/AttendanceController"); 

const router = express.Router();

router.post("/Mark-attendance", markAttendance); // Mark or update attendance
router.get("/Fetch-attendance", fetchAttendance); // Fetch attendance records
router.get("/check", checkAttendance); // Check if attendance exists
router.delete("/:id", deleteAttendance); // Delete an attendance record

module.exports = router;
