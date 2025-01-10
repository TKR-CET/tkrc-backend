const Year = require("../models/studentSection");

// Get students in a section
const getStudentsBySection = async (req, res) => {
  try {
    const { yearId, departmentId, sectionId } = req.params;

    const year = await Year.findById(yearId);
    if (!year) return res.status(404).json({ message: "Year not found" });

    const department = year.departments.id(departmentId);
    if (!department) return res.status(404).json({ message: "Department not found" });

    const section = department.sections.id(sectionId);
    if (!section) return res.status(404).json({ message: "Section not found" });

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
    if (!year) return res.status(404).json({ message: "Year not found" });

    const department = year.departments.id(departmentId);
    if (!department) return res.status(404).json({ message: "Department not found" });

    const section = department.sections.id(sectionId);
    if (!section) return res.status(404).json({ message: "Section not found" });

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
    if (!year) return res.status(404).json({ message: "Year not found" });

    const department = year.departments.id(departmentId);
    if (!department) return res.status(404).json({ message: "Department not found" });

    const section = department.sections.id(sectionId);
    if (!section) return res.status(404).json({ message: "Section not found" });

    section.timetable = timetable;
    await year.save();

    res.status(200).json({ message: "Section timetable updated successfully", section });
  } catch (error) {
    res.status(500).json({ message: "Error updating timetable", error });
  }
};

// Add a new timetable to a section
const addTimetableToSection = async (req, res) => {
  try {
    const { yearId, departmentId, sectionId } = req.params;
    const { timetable } = req.body;

    // Validate the input
    if (!timetable || !Array.isArray(timetable)) {
      return res.status(400).json({ message: "Timetable must be an array" });
    }

    const year = await Year.findById(yearId);
    if (!year) return res.status(404).json({ message: "Year not found" });

    const department = year.departments.id(departmentId);
    if (!department) return res.status(404).json({ message: "Department not found" });

    const section = department.sections.id(sectionId);
    if (!section) return res.status(404).json({ message: "Section not found" });

    // Add or overwrite the timetable
    section.timetable = timetable;

    await year.save();
    res.status(200).json({ message: "Timetable added successfully", section });
  } catch (error) {
    console.error("Error adding timetable:", error.message || error);
    res.status(500).json({ message: "Error adding timetable", error });
  }
};


// Add a new year
const addYear = async (req, res) => {
  try {
    const { year } = req.body;

    const newYear = new Year({ year, departments: [] });
    await newYear.save();

    res.status(201).json({ message: "Year added successfully", newYear });
  } catch (error) {
    res.status(500).json({ message: "Error adding year", error });
  }
};

// Add a department to a year
const addDepartmentToYear = async (req, res) => {
  try {
    const { yearId } = req.params;
    const { name } = req.body;

    const year = await Year.findById(yearId);
    if (!year) return res.status(404).json({ message: "Year not found" });

    year.departments.push({ name, sections: [] });
    await year.save();

    res.status(201).json({ message: "Department added successfully", year });
  } catch (error) {
    res.status(500).json({ message: "Error adding department", error });
  }
};

// Add a section to a department
const addSectionToDepartment = async (req, res) => {
  try {
    const { yearId, departmentId } = req.params;
    const { name } = req.body;

    const year = await Year.findById(yearId);
    if (!year) return res.status(404).json({ message: "Year not found" });

    const department = year.departments.id(departmentId);
    if (!department) return res.status(404).json({ message: "Department not found" });

    department.sections.push({ name, timetable: [], students: [] });
    await year.save();

    res.status(201).json({ message: "Section added successfully", department });
  } catch (error) {
    res.status(500).json({ message: "Error adding section", error });
  }
};

module.exports = {
  getStudentsBySection,
  addStudentToSection,
  updateSectionTimetable,
  addTimetableToSection,
  addYear,
  addDepartmentToYear,
  addSectionToDepartment,
};
