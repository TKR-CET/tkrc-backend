const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  date: { type: String, required: true }, // e.g., "2025-01-09"
  subject: { type: String, required: true }, // e.g., "Maths"
  year: { type: String, required: true }, // e.g., "4th Year"
  department: { type: String, required: true }, // e.g., "CSE"
  section: { type: String, required: true }, // e.g., "A"
  attendance: [
    {
      rollNumber: { type: String, required: true },
      name: { type: String, required: true },
      status: { type: String, enum: ["Present", "Absent"], required: true },
    },
  ],
});

const Attendance = mongoose.model("studentAttendance", AttendanceSchema);
module.exports = Attendance;
