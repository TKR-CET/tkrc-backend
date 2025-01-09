const mongoose = require("mongoose");

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
    type: String,
    default: "",
  },
  role: {
    type: String,
    required: true,
  },
  department: {
    type: String, // E.g., "Computer Science", "Electrical Engineering"
    required: true,
  },
  timetable: {
    type: timetableSchema,
    default: () => ({}),
  },
});

const Faculty = mongoose.model("Faculty", facultySchema);

module.exports = Faculty;
