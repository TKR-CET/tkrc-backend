const express = require("express");
const multer = require("multer");

const {   
  addFaculty, 
  getAllFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
  getFacultyTimetable,
  updateFacultyTimetable,
  loginFaculty
} = require("../controllers/FacultyController");

const router = express.Router();
// Add faculty with image upload
router.post("/addfaculty", upload.single("image"), addFaculty);

// Update faculty with image upload
router.put("/:id", upload.single("image"), updateFaculty);

router.get("/getfaculty", getAllFaculty); // Get all faculty
router.get("/:id", getFacultyById); // Get a faculty by ID/ Update faculty
router.delete("/:id", deleteFaculty); // Delete faculty
router.get("/:id/timetable", getFacultyTimetable); // Get faculty timetable
router.put("/update/:id/timetable", updateFacultyTimetable); // Update faculty timetable
router.post("/login", loginFaculty);
module.exports = router;
