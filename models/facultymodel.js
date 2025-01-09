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
  required:true

  },
  facultyId: {
    type: String,
    unique: true,
     required:true
    
  },
  image: {
    type: String,
    default: "",
     required:true

  },
  role: {
    type: String,
     required:true

  },
  department: {
    type: String,
     required:true

    
  },
  timetable: {
    type: timetableSchema,
    default: () => ({}), // Ensure timetable always exists as an object
  },
});

// Faculty Model
const Faculty = mongoose.model("Faculty", facultySchema);

module.exports = Faculty;
