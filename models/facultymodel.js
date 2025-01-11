const bcrypt = require("bcryptjs");
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
  password: { type: String, required: true }, // Add password field
  timetable: [TimetableSchema], // Array of timetables for different days
});

// Hash the password before saving the faculty document
FacultySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash password if it's being modified
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Faculty = mongoose.model("Facultydata", FacultySchema);
module.exports = Faculty;
