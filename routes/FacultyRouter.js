const express = require("express");
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

router.post("addfaculty/", addFaculty); // Add new faculty
router.get("/getfaculty", getAllFaculty); // Get all faculty
router.get("/:id", getFacultyById); // Get a faculty by ID
router.put("/:id", updateFaculty); // Update faculty
router.delete("/:id", deleteFaculty); // Delete faculty
router.get("/:id/timetable", getFacultyTimetable); // Get faculty timetable
router.put("/update/:id/timetable", updateFacultyTimetable); // Update faculty timetable
router.post("/login", loginFaculty);
module.exports = router;
