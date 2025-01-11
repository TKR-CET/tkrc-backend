const Faculty = require("../models/facultymodel");
const bcrypt = require("bcryptjs");
 
// Login faculty
const loginFaculty = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the faculty by their ID
        const faculty = await Faculty.findOne({ facultyId: username });

        if (!faculty) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid credentials: Faculty not found" 
            });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, faculty.password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid credentials: Incorrect password" 
            });
        }

        // Successful login
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
            error: error.message 
        });
    }
};

// Add a new faculty
const addFaculty = async (req, res) => {
  try {
    const { name, facultyId, role, department, password, timetable } = req.body;

    const newFaculty = new Faculty({
      name,
      facultyId,
      role,
      department,
      password, // Include password here
      timetable,
    });

    await newFaculty.save();
    res.status(201).json({ message: "Faculty added successfully", faculty: newFaculty });
  } catch (error) {
    res.status(500).json({ message: "Error adding faculty", error });
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

// Get faculty by ID
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

// Update a faculty
const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedFaculty = await Faculty.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedFaculty) return res.status(404).json({ message: "Faculty not found" });

    res.status(200).json({ message: "Faculty updated successfully", faculty: updatedFaculty });
  } catch (error) {
    res.status(500).json({ message: "Error updating faculty", error });
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
        const { id } = req.params; // 'id' is the MongoDB _id
        const faculty = await Faculty.findById(id); // Query by _id

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
            error: error.message
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
