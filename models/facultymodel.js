const mongoose = require("mongoose");

// Timetable Schema
const timetableSchema = new mongoose.Schema({
  monday: {
    type: [String],
    default: [],
  },
  tuesday: {
    type: [String],
    default: [],
  },
  wednesday: {
    type: [String],
    default: [],
  },
  thursday: {
    type: [String],
    default: [],
  },
  friday: {
    type: [String],
    default: [],
  },
  saturday: {
    type: [String],
    default: [],
  },
});

// Faculty Schema
const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"], // Custom error message for missing name
    trim: true,
  },
  facultyId: {
    type: String,
    required: [true, "Faculty ID is required"],
    unique: true,
    trim: true,
  },
  image: {
    type: String,
    default: "",
    trim: true,
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    trim: true,
  },
  department: {
    type: String,
    required: [true, "Department is required"],
    trim: true,
  },
  timetable: {
    type: timetableSchema,
    default: () => ({}), // Ensure timetable always exists as an object
  },
});

// Faculty Model
const Faculty = mongoose.model("Faculty", facultySchema);

module.exports = Faculty;
