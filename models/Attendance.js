const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  periods: {
    type: [Number], // Array of selected periods
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
  },
  attendance: [
    {
      rollNumber: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["present", "absent"], // Only "present" or "absent" allowed
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Attendance", attendanceSchema);