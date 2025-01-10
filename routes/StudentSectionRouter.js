const express = require("express");
const {
  getStudentsBySection,
  addStudentToSection,
  updateSectionTimetable,
  addYear,
  addDepartmentToYear,
  addSectionToDepartment,
} = require("../controllers/StudentSectionController");

const router = express.Router();

// Year Management
router.post("/", addYear); // Add a new year

// Department Management
router.post("/:yearId/department", addDepartmentToYear); // Add a department to a year

// Section Management
router.post("/:yearId/:departmentId/section", addSectionToDepartment); // Add a section to a department

// Students Management
router.get("/:yearId/:departmentId/:sectionId/students", getStudentsBySection); // Get students in a section
router.post("/:yearId/:departmentId/:sectionId/students", addStudentToSection); // Add a student to a section

// Section Timetable Management
router.put("/:yearId/:departmentId/:sectionId/timetable", updateSectionTimetable); // Update section timetable

module.exports = router;
