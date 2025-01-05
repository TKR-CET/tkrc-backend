const express = require("express");
const { markAttendance, fetchAttendance, checkAttendance } = require("../controllers/attendanceController");

const router = express.Router();

router.post("/mark-attendance", markAttendance);
router.get("/attendance", fetchAttendance);
router.get("/attendance/check", checkAttendance);

module.exports = router;
