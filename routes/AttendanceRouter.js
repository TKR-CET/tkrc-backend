const express = require("express");
const {
  markAttendance,
  fetchAttendance,
  checkAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");

const router = express.Router();

router.post("/", markAttendance); // Mark or update attendance
router.get("/", fetchAttendance); // Fetch attendance records
router.get("/check", checkAttendance); // Check if attendance exists
router.delete("/:id", deleteAttendance); // Delete an attendance record

module.exports = router;
