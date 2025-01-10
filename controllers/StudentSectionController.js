const Year = require("../models/Year");

// Get students in a section
const getStudentsBySection = async (req, res) => {
  try {
    const { yearId, departmentId, sectionId } = req.params;

    const year = await Year.findById(yearId);
    const department = year.departments.id(departmentId);
    const section = department.sections.id(sectionId);

    if (!year || !department || !section) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.status(200).json({ students: section.students });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

// Add a student to a section
const addStudentToSection = async (req, res) => {
  try {
    const { yearId, departmentId, sectionId } = req.params;
    const { rollNumber, name } = req.body;

    const year = await Year.findById(yearId);
    const department = year.departments.id(departmentId);
    const section = department.sections.id(sectionId);

    if (!year || !department || !section) {
      return res.status(404).json({ message: "Section not found" });
    }

    section.students.push({ rollNumber, name });
    await year.save();

    res.status(201).json({ message: "Student added successfully", section });
  } catch (error) {
    res.status(500).json({ message: "Error adding student", error });
  }
};

// Update a section's timetable
const updateSectionTimetable = async (req, res) => {
  try {
    const { yearId, departmentId, sectionId } = req.params;
    const { timetable } = req.body;

    const year = await Year.findById(yearId);
    const department = year.departments.id(departmentId);
    const section = department.sections.id(sectionId);

    if (!year || !department || !section) {
      return res.status(404).json({ message: "Section not found" });
    }

    section.timetable = timetable;
    await year.save();

    res.status(200).json({ message: "Section timetable updated successfully", section });
  } catch (error) {
    res.status(500).json({ message: "Error updating timetable", error });
  }
};

module.exports = {
  getStudentsBySection,
  addStudentToSection,
  updateSectionTimetable,
};
