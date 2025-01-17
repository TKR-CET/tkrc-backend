const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');

// Add Year
router.post('/years', studentController.addYear);

// Add Department to a Year
router.post('/years/:yearId/departments', studentController.addDepartmentToYear);

// Add Section to a Department
router.post('/years/:yearId/departments/:departmentId/sections', studentController.addSectionToDepartment);

// Add Students to a Section
router.post('/years/:yearId/departments/:departmentId/sections/:sectionId/students', studentController.addStudentsToSection);

// Get Students in a Section
router.get('/years/:yearId/departments/:departmentId/sections/:sectionId/students', studentController.getStudentsBySection);

// Add or Update Timetable for a Section
router.post('/years/:yearId/departments/:departmentId/sections/:sectionId/timetable', studentController.upsertSectionTimetable);

module.exports = router;
