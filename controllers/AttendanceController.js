const Attendance = require("../models/studentAttendance");
 
// Mark Attendance 
const markAttendance = async (req, res) => {
  try {
    const { date, periods, subject, topic, remarks, year, department, section, attendance } = req.body;

    // Check if the date is today
    const todayDate = new Date().toISOString().split("T")[0];
    if (date !== todayDate) {
      return res.status(403).json({
        message: "Attendance can only be edited or marked for the current date.",
      });
    }

    // Validate required fields
    if (!date || !periods || !subject || !topic || !year || !department || !section || !attendance) {
      return res.status(400).json({ message: "All mandatory fields are required" });
    }

    // Validate that periods is a non-empty array of numbers
    if (!Array.isArray(periods) || periods.length === 0 || periods.some((p) => typeof p !== "number")) {
      return res.status(400).json({ message: "Periods must be a non-empty array of numbers" });
    }

    // Validate that attendance is a valid array of objects
    if (!Array.isArray(attendance) || attendance.length === 0) {
      return res.status(400).json({ message: "Attendance must be a non-empty array of objects" });
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

    // Process attendance
    const attendanceResponses = [];
    for (const period of periods) {
      const existingAttendance = await Attendance.findOne({ date, period, year, department, section });

      if (existingAttendance) {
        existingAttendance.subject = subject;
        existingAttendance.topic = topic;
        existingAttendance.remarks = remarks;
        existingAttendance.attendance = formattedAttendance;

        const updatedAttendance = await existingAttendance.save();
        attendanceResponses.push({ period, record: updatedAttendance, status: "updated" });
      } else {
        const newAttendance = new Attendance({
          date,
          period,
          subject,
          topic,
          remarks,
          year,
          department,
          section,
          attendance: formattedAttendance,
        });

        const savedAttendance = await newAttendance.save();
        attendanceResponses.push({ period, record: savedAttendance, status: "created" });
      }
    }

    res.status(201).json({
      message: "Attendance marked successfully for all selected periods!",
      records: attendanceResponses,
    });
  } catch (error) {
    console.error("Error marking attendance:", error.message || error);
    res.status(500).json({
      message: "An error occurred while marking attendance",
      error: error.message || error,
    });
  }
};

// Fetch Attendance Records by Date
const fetchAttendanceByDate = async (req, res) => {
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
      message: "Attendance records fetched successfully for the date",
      data: attendanceRecords,
    });
  } catch (error) {
    console.error("Error fetching attendance by date:", error.message || error);
    res.status(500).json({
      message: "An error occurred while fetching attendance by date",
      error: error.message || error,
    });
  }
};

// Fetch Attendance Records with Filters
const fetchAttendance = async (req, res) => {
  try {
    const { date, year, department, section } = req.query;

    if (!date || !year || !department || !section) {
      return res.status(400).json({ message: "Date, year, department, and section are required" });
    }

    const attendanceRecords = await Attendance.find({ date, year, department, section });

    if (!attendanceRecords.length) {
      return res.status(404).json({ message: "No attendance records found for the given filters" });
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

// Check Existing Attendance and Disable Marked Periods
const checkAttendance = async (req, res) => {
  try {
    const { date, year, department, section } = req.query;

    if (!date || !year || !department || !section) {
      return res.status(400).json({ message: "Date, year, department, and section are required" });
    }

    // Fetch attendance records for the specific date, year, department, and section
    const attendanceRecords = await Attendance.find({ date, year, department, section });

    // Extract and store marked periods, ensuring no null periods
    const markedPeriods = attendanceRecords
      .map((record) => record.period)
      .filter((period) => period !== null && period !== undefined); // Remove null or undefined periods

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
  fetchAttendanceByDate,
  checkAttendance,
};
