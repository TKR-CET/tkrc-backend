const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  date: { type: String, required: true }, // e.g., "2025-01-09"
  periods: { type: [Number], required: true }, // Array of selected periods
  subject: { type: String, required: true }, // e.g., "Mathematics"
  topic: { type: String, required: true }, // e.g., "Algebra Basics"
  remarks: { type: String }, // Optional remarks
  year: { type: String, required: true }, // e.g., "4th Year"
  department: { type: String, required: true }, // e.g., "CSE"
  section: { type: String, required: true }, // e.g., "A"
  attendance: [
    {
      rollNumber: { type: String, required: true }, // Student Roll Number
      name: { type: String, required: true }, // Student Name
      status: { type: String, enum: ["present", "absent"], required: true }, // Attendance Status
    },
  ],
});

const Attendance = mongoose.model("StudentAttendance", AttendanceSchema);
module.exports = Attendance;
