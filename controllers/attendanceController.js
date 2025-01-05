const Attendance = require("../models/Attendance");

// Mark Attendance
const markAttendance = async (req, res) => {
  try {
    const { date, periods, subject, topic, remarks, attendance } = req.body;

    // Validate required fields
    if (!date || !periods || !subject || !topic || !attendance) {
      return res.status(400).json({ message: "All mandatory fields are required" });
    }

    // Validate periods is an array
    if (!Array.isArray(periods) || periods.some((p) => typeof p !== "number")) {
      return res.status(400).json({ message: "Periods must be an array of numbers" });
    }

    // Validate attendance is an array of valid entries
    if (!Array.isArray(attendance)) {
      return res.status(400).json({ message: "Attendance must be an array of objects" });
    }

    const formattedAttendance = attendance.map(({ rollNumber, name, status }) => {
      if (!rollNumber || !name || !status) {
        throw new Error("Each attendance entry must include rollNumber, name, and status");
      }
      if (!["present", "absent"].includes(status.toLowerCase())) {
        throw new Error(`Invalid status for rollNumber ${rollNumber}. Status must be 'present' or 'absent'.`);
      }
      return { rollNumber, name, status: status.toLowerCase() };
    });

    // Save the attendance record
    const newAttendance = new Attendance({
      date,
      periods,
      subject,
      topic,
      remarks,
      attendance: formattedAttendance,
    });

    await newAttendance.save();

    res.status(201).json({
      message: "Attendance successfully marked!",
      data: newAttendance,
    });
  } catch (error) {
    console.error("Error marking attendance:", error.message || error);
    res.status(500).json({
      message: "An error occurred while marking attendance",
      error: error.message || error,
    });
  }
};

// Fetch Attendance Records
const fetchAttendance = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const attendanceRecords = await Attendance.find({ date });

    if (!attendanceRecords.length) {
      return res.status(404).json({ message: "No attendance records found for the given date" });
    }

    res.status(200).json({
      message: "Attendance records fetched successfully",
      data: attendanceRecords,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error.message || error);
    res.status(500).json({
      message: "An error occurred while fetching attendance",
      error: error.message || error,
    });
  }
};

// Check Existing Attendance
const checkAttendance = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    // Fetch attendance records for the specific date
    const attendanceRecords = await Attendance.find({ date });

    // Extract periods that already have attendance marked
    const markedPeriods = attendanceRecords.flatMap((record) => record.periods);

    res.status(200).json({
      message: "Checked existing attendance records successfully",
      periods: [...new Set(markedPeriods)], // Return unique periods
    });
  } catch (error) {
    console.error("Error checking attendance:", error.message || error);
    res.status(500).json({
      message: "An error occurred while checking attendance",
      error: error.message || error,
    });
  }
};

module.exports = {
  markAttendance,
  fetchAttendance,
  checkAttendance,
};
