const Attendance = require("../models/Attendance");

// Mark Attendance  
const markAttendance = async (req, res) => {
  try {
    const { date, periods, subject, topic, remarks, attendance } = req.body;

    if (!date || !periods || !subject || !topic || !attendance) {
      return res.status(400).json({ message: "All mandatory fields are required" });
    }

    if (!Array.isArray(periods) || periods.some((p) => typeof p !== "number")) {
      return res.status(400).json({ message: "Periods must be an array of numbers" });
    }

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

    const newAttendance = new Attendance({
      date,
      periods,
      subject,
      topic,
      remarks,
      attendance: formattedAttendance,
    });

    await newAttendance.save();

    res.status(201).json({ message: "Attendance successfully marked!", data: newAttendance });
  } catch (error) {
    console.error("Error marking attendance:", error.message || error);
    res.status(500).json({ message: "An error occurred while marking attendance", error: error.message || error });
  }
};

// Fetch Attendance
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

    res.status(200).json({ message: "Attendance records fetched successfully", data: attendanceRecords });
  } catch (error) {
    console.error("Error fetching attendance:", error.message || error);
    res.status(500).json({ message: "An error occurred while fetching attendance", error: error.message || error });
  }
};

// Check Marked Attendance Periods
const checkMarkedAttendance = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const attendanceRecords = await Attendance.find({ date });

    const markedPeriods = attendanceRecords.reduce((acc, record) => {
      return acc.concat(record.periods);
    }, []);

    res.status(200).json({ periods: [...new Set(markedPeriods)] }); // Unique periods
  } catch (error) {
    console.error("Error fetching marked attendance:", error.message || error);
    res.status(500).json({ message: "An error occurred while fetching marked attendance", error: error.message || error });
  }
};

// Update Attendance
const updateAttendance = async (req, res) => {
  try {
    const { date, periods, updatedAttendance, topic, subject, remarks } = req.body;

    if (!date || !periods || !updatedAttendance) {
      return res.status(400).json({ message: "Date, periods, and updated attendance are required" });
    }

    if (!Array.isArray(periods) || periods.some((p) => typeof p !== "number")) {
      return res.status(400).json({ message: "Periods must be an array of numbers" });
    }

    if (!Array.isArray(updatedAttendance)) {
      return res.status(400).json({ message: "Updated attendance must be an array of objects" });
    }

    const formattedAttendance = updatedAttendance.map(({ rollNumber, name, status }) => {
      if (!rollNumber || !name || !status) {
        throw new Error("Each attendance entry must include rollNumber, name, and status");
      }
      if (!["present", "absent"].includes(status.toLowerCase())) {
        throw new Error(`Invalid status for rollNumber ${rollNumber}. Status must be 'present' or 'absent'.`);
      }
      return { rollNumber, name, status: status.toLowerCase() };
    });

    const attendanceRecord = await Attendance.findOne({ date, periods });

    if (!attendanceRecord) {
      return res.status(404).json({ message: "No attendance record found for the specified date and periods" });
    }

    attendanceRecord.attendance = formattedAttendance;
    if (topic) attendanceRecord.topic = topic;
    if (subject) attendanceRecord.subject = subject;
    if (remarks) attendanceRecord.remarks = remarks;

    await attendanceRecord.save();

    res.status(200).json({ message: "Attendance successfully updated!", data: attendanceRecord });
  } catch (error) {
    console.error("Error updating attendance:", error.message || error);
    res.status(500).json({ message: "An error occurred while updating attendance", error: error.message || error });
  }
};

module.exports = {
  markAttendance,
  fetchAttendance,
  checkMarkedAttendance,
  updateAttendance,
};
