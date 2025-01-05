const express = require("express");
const { markAttendance, fetchAttendance, checkAttendance, updateAttendance } = require("../controllers/attendanceController");

const router = express.Router();

router.post("/mark-attendance", markAttendance);
router.get("/fetch-attendance", fetchAttendance);
router.get("/check", checkAttendance);


module.exports = router;
