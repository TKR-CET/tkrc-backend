const mongoose = require("mongoose");

// Timetable schema for each day
const TimetableSchema = new mongoose.Schema({
  day: { type: String, required: true }, // e.g., Monday
  periods: [
    {
      periodNumber: { type: Number, required: true }, // Period number (e.g., 1, 2, 3)
      subject: { type: String, required: true }, // Subject name
      year: { type: String, required: true }, // Year (e.g., First Year, Second Year)
      department: { type: String, required: true }, // Department name
      section: { type: String, required: true }, // Section (e.g., A, B, C)
    },
  ],
});

// Faculty schema
const FacultySchema = new mongoose.Schema({
  name: { type: String, required: true }, // Faculty name
  facultyId: { type: String, unique: true, required: true }, // Unique faculty ID
  role: { type: String, required: true }, // Role (e.g., Professor, Lecturer)
  department: { type: String, required: true }, // Department name
  password: { type: String, required: true }, // Plain text password (not hashed)
  timetable: [TimetableSchema], // Timetable (array of timetables for different days)
  image: { type: String }, // Path to faculty's profile image
}, {
  timestamps: true, // Add createdAt and updatedAt timestamps
});

// Create the Faculty model
const Faculty = mongoose.model("Facultydata", FacultySchema);

module.exports = Faculty;
