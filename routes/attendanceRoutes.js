const express = require("express");
const router = express.Router();
const { 
  markAttendance,
  fetchAttendance,
  checkMarkedAttendance,
  updateAttendance,
} = require("../controllers/attendanceController");

// Routes
router.post("/mark-attendance", markAttendance);
router.get("/fetch-attendance", fetchAttendance);
router.get("/check", checkMarkedAttendance);
router.put("/update-attendance", updateAttendance);

module.exports = router;
