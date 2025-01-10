const mongoose = require("mongoose"); 

const TimetableSchema = new mongoose.Schema({
  day: { type: String, required: true }, // e.g., Monday
  periods: [
    {
      periodNumber: { type: Number, required: true },
      subject: { type: String, required: true },
      year: { type: String, required: true },
      department: { type: String, required: true },
      section: { type: String, required: true },
    },
  ],
});

const FacultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  facultyId: { type: String, unique: true, required: true },
  role: { type: String, required: true }, // e.g., Professor
  department: { type: String, required: true },
  timetable: [TimetableSchema], // Array of timetables for different days
});

const Faculty = mongoose.model("Facultydata", FacultySchema);
module.exports = Faculty;
