const express = require("express");
const router = express.Router();
const { markAttendance, fetchAttendance } = require("../controllers/attendanceController");

// Route to mark attendance
router.post("/mark-attendance", markAttendance);

// Route to fetch attendance by date
router.get("/fetch-attendance", fetchAttendance);

module.exports = router;
