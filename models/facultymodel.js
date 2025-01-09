
const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  monday: {
    type: [String], // Array of subjects or tasks for Monday
    default: [],
    required:true;
  },
  tuesday: {
    type: [String], // Array of subjects or tasks for Tuesday
    default: [],
     required:true;
  },
  wednesday: {
    type: [String], // Array of subjects or tasks for Wednesday
    default: [],
     required:true;
  },
  thursday: {
    type: [String], // Array of subjects or tasks for Thursday
    default: [],
     required:true;
  },
  friday: {
    type: [String], // Array of subjects or tasks for Friday
    default: [],
     required:true;
  },
  saturday: {
    type: [String], // Array of subjects or tasks for Saturday
    default: [],
     required:true;
  },
});

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  facultyId: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String, // URL for the faculty's image
    default: "",
  },
  role: {
    type: String, // e.g., "Professor", "Assistant Professor", etc.
    required: true,
  },
  timetable: {
    type: timetableSchema,
    default: () => ({}),
  },
});

const Faculty = mongoose.model("Faculty", facultySchema);

module.exports = Faculty;
