const express = require('express');
const router = express.Router();
const yearController = require('../controllers/subjectscontroller'); // Adjust path

// CRUD operations for years
router.get('/year-subjects', yearController.getAllYears);
router.get('/year-subjects/:id', yearController.getYearById);
router.post('/year-subjects', yearController.addYear);
router.put('/year-subjects/:id', yearController.updateYear);
router.delete('/year-subjects/:id', yearController.deleteYear);

// Add department and subject
router.post('/year-subjects/:yearId/departments', yearController.addDepartmentToYear);
router.post('/year-subjects/:yearId/departments/:departmentId/subjects', yearController.addSubjectToDepartment);

module.exports = router;
