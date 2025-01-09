const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/studentscontroller'); 

// Routes for Year
router.get('/years', attendanceController.getAllYears);
router.get('/years/:id', attendanceController.getYearById);
router.post('/years', attendanceController.addYear);

// Routes for Department
router.post('/years/:yearId/departments', attendanceController.addDepartmentToYear);

// Routes for Section
router.post('/years/:yearId/departments/:departmentId/sections', attendanceController.addSectionToDepartment);

// Routes for Students
router.post(
  '/years/:yearId/departments/:departmentId/sections/:sectionId/students',
  attendanceController.addStudentToSection
);
router.put(
  '/years/:yearId/departments/:departmentId/sections/:sectionId/students/:studentId',
  attendanceController.updateStudentStatus
);

module.exports = router;
