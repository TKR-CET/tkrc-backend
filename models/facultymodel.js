const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the timetable sub-schema
const timetableSchema = new mongoose.Schema({
  day: { type: String, required: true },
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

// Define the main Faculty schema
const facultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    facultyId: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    password: { type: String, required: true },
    timetable: { type: [timetableSchema], required: true },
    image: { type: String }, // Store the file path for the image if uploaded
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields automatically
  }
);

// Hash password before saving
facultySchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare the password during login
facultySchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the Faculty model
const Faculty = mongoose.model("Faculty", facultySchema);

module.exports = Faculty;
