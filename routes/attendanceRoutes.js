const express = require("express");
const router = express.Router();
const {
  markAttendance,
  fetchAttendance,
  checkMarkedAttendance,
} = require("../controllers/attendanceController");

// Route to mark attendance
router.post("/mark-attendance", markAttendance);

// Route to fetch attendance by date
router.get("/fetch-attendance", fetchAttendance);

// Route to check marked periods by date
router.get("/check", checkMarkedAttendance);

module.exports = router;
