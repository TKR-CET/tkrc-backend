const express = require("express");
const {
  getStudentsBySection,
  addStudentsToSection,
  upsertSectionTimetable,
  addYear,
  addDepartmentToYear,
  addSectionToDepartment,
} = require("../controllers/studentSectionController");

const router = express.Router();

// Get all students in a section
router.get("/:yearId/:departmentId/:sectionId/students", getStudentsBySection);

// Add multiple students to a section
router.post("/:yearId/:departmentId/:sectionId/students", addStudentsToSection);

// Add or update a timetable for a section
router.put("/:yearId/:departmentId/:sectionId/timetable", upsertSectionTimetable);

// Add a new year
router.post("/years", addYear);

// Add a department to a year
router.post("/years/:yearId/departments", addDepartmentToYear);

// Add a section to a department
router.post("/:yearId/:departmentId/sections", addSectionToDepartment);

module.exports = router;
