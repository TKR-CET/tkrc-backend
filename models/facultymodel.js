const bcrypt = require("bcryptjs");
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
  password: { type: String, required: true }, // Encrypted password
  timetable: [TimetableSchema], // Timetable (array of timetables for different days)
  image: { type: String }, // Path to faculty's profile image
}, {
  timestamps: true, // Add createdAt and updatedAt timestamps
});

// Middleware to hash the password before saving the faculty document
FacultySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt for hashing
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
});

// Compare plaintext password with hashed password
FacultySchema.methods.comparePassword = async function (plaintextPassword) {
  return bcrypt.compare(plaintextPassword, this.password);
};

// Create the Faculty model
const Faculty = mongoose.model("Facultydata", FacultySchema);

module.exports = Faculty;
