const Attendance = require("../models/Attendance");
 
exports.markAttendance = async (req, res) => {
  const { date, periods, subject, topic, remarks, attendance } = req.body;

  try {
    const existingRecord = await Attendance.findOne({ date, periods });

    if (existingRecord) {
      return res.status(400).json({
        message: "Attendance for the selected date and periods already exists.",
      });
    }

    const newRecord = new Attendance({
      date,
      periods,
      subject,
      topic,
      remarks,
      attendance,
    });

    await newRecord.save();
    res.status(201).json({ message: "Attendance marked successfully!" });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ message: "Failed to mark attendance" });
  }
};

exports.updateAttendance = async (req, res) => {
  const { date, periods, updatedAttendance, subject, topic, remarks } = req.body;

  try {
    const attendanceRecord = await Attendance.findOne({ date, periods });

    if (!attendanceRecord) {
      return res.status(404).json({ message: "No attendance record found." });
    }

    attendanceRecord.attendance = updatedAttendance || attendanceRecord.attendance;
    attendanceRecord.subject = subject || attendanceRecord.subject;
    attendanceRecord.topic = topic || attendanceRecord.topic;
    attendanceRecord.remarks = remarks || attendanceRecord.remarks;

    await attendanceRecord.save();
    res.status(200).json({ message: "Attendance updated successfully!" });
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({ message: "Failed to update attendance" });
  }
};

exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find();
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json({ message: "Failed to fetch attendance records" });
  }
};
