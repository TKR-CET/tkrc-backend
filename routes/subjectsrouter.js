const express = require('express');
const router = express.Router();
const yearController = require('../controllers/yearController'); // Adjust path

// CRUD operations for years
router.get('/years', yearController.getAllYears);
router.get('/years/:id', yearController.getYearById);
router.post('/years', yearController.addYear);
router.put('/years/:id', yearController.updateYear);
router.delete('/years/:id', yearController.deleteYear);

// Add department and subject
router.post('/years/:yearId/departments', yearController.addDepartmentToYear);
router.post('/years/:yearId/departments/:departmentId/subjects', yearController.addSubjectToDepartment);

module.exports = router;
