const express = require("express");
const {
  getStudentsBySection,
  addStudentToSection,
  updateSectionTimetable,
} = require("../controllers/StudentSectionController");

const router = express.Router();

router.get("/:yearId/:departmentId/:sectionId/students", getStudentsBySection); // Get students in a section
router.post("/:yearId/:departmentId/:sectionId/students", addStudentToSection); // Add a student to a section
router.put("/:yearId/:departmentId/:sectionId/timetable", updateSectionTimetable); // Update section timetable

module.exports = router;
