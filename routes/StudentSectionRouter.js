const express = require("express");
const {
  getStudentsBySection,
  addStudentToSection,
  updateSectionTimetable,
  addTimetableToSection,
  addYear,
  addDepartmentToYear,
  addSectionToDepartment,
} = require("../controllers/StudentSectionController");

const router = express.Router();

// Routes for managing sections, students, and timetable

// Get all students in a section
router.get("/:yearId/:departmentId/:sectionId/students", getStudentsBySection);

// Add a new student to a section
router.post("/:yearId/:departmentId/:sectionId/students", addStudentToSection);

// Update timetable for a section
router.put("/:yearId/:departmentId/:sectionId/timetable", updateSectionTimetable);

// Add a new timetable entry to a section
router.post("/:yearId/:departmentId/:sectionId/timetable", addTimetableToSection);

// Add a new year
router.post("/year", addYear);

// Add a new department to a year
router.post("/:yearId/department", addDepartmentToYear);

// Add a new section to a department
router.post("/:yearId/:departmentId/section", addSectionToDepartment);

module.exports = router;
