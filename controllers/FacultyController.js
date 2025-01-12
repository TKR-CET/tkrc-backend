const Faculty = require("../models/facultymodel");
const bcrypt = require("bcryptjs");
const path = require("path"); 

const addFaculty = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    // Extract data from the request body
    const { name, facultyId, role, department, password, timetable } = req.body;

    // Validate required fields
    if (!name || !facultyId || !role || !department || !password || !timetable) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);
    // Get the image file path if provided
    const imagePath = req.file ? req.file.path : null;

    // Validate the timetable format
    let parsedTimetable;
    try {
      parsedTimetable = JSON.parse(timetable);
      // Optionally, you can validate the structure of the timetable
      if (!Array.isArray(parsedTimetable) || parsedTimetable.length === 0) {
        return res.status(400).json({ message: "Timetable format is invalid" });
      }
    } catch (error) {
      return res.status(400).json({ message: "Invalid timetable JSON format" });
    }

    // Create a new Faculty object and save it to the database
    const newFaculty = new Faculty({
      name,
      facultyId,
      role,
      department,
      password: hashedPassword,
      timetable: parsedTimetable,  // Store parsed timetable
      image: imagePath,  // Store image path if uploaded
    });

    // Save the faculty to the database
    await newFaculty.save();

    // Respond with success message
    res.status(201).json({ message: "Faculty added successfully", faculty: newFaculty });
  } catch (error) {
    console.error("Error in addFaculty:", error.message);
    res.status(500).json({ message: "Error adding faculty", error: error.message });
  }
};
// Update faculty (with image upload)
const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, facultyId, role, department, password, timetable } = req.body;
    const imagePath = req.file ? req.file.path : null; // Get the uploaded image path

    const updatedData = {
      name,
      facultyId,
      role,
      department,
      password: password ? await bcrypt.hash(password, 10) : undefined, // Update the password if provided
      timetable,
      image: imagePath, // Update the image path
    };

    const updatedFaculty = await Faculty.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedFaculty) return res.status(404).json({ message: "Faculty not found" });

    res.status(200).json({ message: "Faculty updated successfully", faculty: updatedFaculty });
  } catch (error) {
    res.status(500).json({ message: "Error updating faculty", error });
  }
};

// Login faculty
const loginFaculty = async (req, res) => {
  try {
    const { username, password } = req.body;

    const faculty = await Faculty.findOne({ facultyId: username });

    if (!faculty) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials: Faculty not found",
      });
    }

    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials: Incorrect password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      facultyId: faculty._id,
      name: faculty.name,
      role: faculty.role,
      department: faculty.department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error during login",
      error: error.message,
    });
  }
};

// Get a faculty by ID (including image)
const getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await Faculty.findById(id);

    if (!faculty) return res.status(404).json({ message: "Faculty not found" });

    res.status(200).json(faculty);
  } catch (error) {
    res.status(500).json({ message: "Error fetching faculty", error });
  }
};

// Get all faculty
const getAllFaculty = async (req, res) => {
  try {
    const facultyList = await Faculty.find();
    res.status(200).json(facultyList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching faculty", error });
  }
};

// Delete a faculty
const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFaculty = await Faculty.findByIdAndDelete(id);

    if (!deletedFaculty) return res.status(404).json({ message: "Faculty not found" });

    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting faculty", error });
  }
};

// Get faculty timetable
const getFacultyTimetable = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.status(200).json({
      timetable: faculty.timetable,
      facultyDetails: {
        name: faculty.name,
        department: faculty.department,
        role: faculty.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching timetable",
      error: error.message,
    });
  }
};

// Update faculty timetable
const updateFacultyTimetable = async (req, res) => {
  try {
    const { id } = req.params;
    const { timetable } = req.body;

    const faculty = await Faculty.findById(id);

    if (!faculty) return res.status(404).json({ message: "Faculty not found" });

    faculty.timetable = timetable;
    await faculty.save();

    res.status(200).json({ message: "Faculty timetable updated successfully", faculty });
  } catch (error) {
    res.status(500).json({ message: "Error updating timetable", error });
  }
};

module.exports = {
  
  addFaculty,
  getAllFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
  getFacultyTimetable,
  updateFacultyTimetable,
  loginFaculty,
};
