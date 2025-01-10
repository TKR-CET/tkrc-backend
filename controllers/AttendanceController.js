const Attendance = require("../models/Attendance");

// Mark Attendance
const markAttendance = async (req, res) => {
  try {
    const { date, year, department, section, periods, subject, topic, remarks, attendance } = req.body;

    // Validate required fields
    if (!date || !year || !department || !section || !periods || !subject || !attendance) {
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

    // Check if attendance exists for the date, section, and periods
    const existingAttendance = await Attendance.findOne({
      date,
      year,
      department,
      section,
      periods,
      subject,
    });

    if (existingAttendance) {
      // Update existing attendance
      existingAttendance.topic = topic;
      existingAttendance.remarks = remarks;
      existingAttendance.attendance = formattedAttendance;

      await existingAttendance.save();

      res.status(200).json({
        message: "Attendance updated successfully!",
        data: existingAttendance,
      });
    } else {
      // Create a new attendance record
      const newAttendance = new Attendance({
        date,
        year,
        department,
        section,
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
    }
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
    const { date, year, department, section, subject } = req.query;

    // Validate required parameters
    if (!date || !year || !department || !section || !subject) {
      return res.status(400).json({ message: "All required query parameters must be provided" });
    }

    const attendanceRecords = await Attendance.find({
      date,
      year,
      department,
      section,
      subject,
    });

    if (!attendanceRecords.length) {
      return res.status(404).json({ message: "No attendance records found for the specified criteria" });
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
    const { date, year, department, section, subject } = req.query;

    // Validate required parameters
    if (!date || !year || !department || !section || !subject) {
      return res.status(400).json({ message: "All required query parameters must be provided" });
    }

    const attendanceRecords = await Attendance.findOne({
      date,
      year,
      department,
      section,
      subject,
    });

    if (attendanceRecords) {
      return res.status(200).json({
        message: "Attendance already exists",
        data: attendanceRecords,
      });
    } else {
      res.status(404).json({ message: "No attendance record found for the specified criteria" });
    }
  } catch (error) {
    console.error("Error checking attendance:", error.message || error);
    res.status(500).json({
      message: "An error occurred while checking attendance",
      error: error.message || error,
    });
  }
};

// Delete Attendance Record
const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecord = await Attendance.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.status(200).json({
      message: "Attendance record deleted successfully",
      data: deletedRecord,
    });
  } catch (error) {
    console.error("Error deleting attendance:", error.message || error);
    res.status(500).json({
      message: "An error occurred while deleting attendance",
      error: error.message || error,
    });
  }
};

module.exports = {
  markAttendance,
  fetchAttendance,
  checkAttendance,
  deleteAttendance,
};
