const express = require("express");
const {
  addFaculty,
  getAllFaculty,
  getFacultyById,  
  updateFaculty,
  deleteFaculty,
} = require("../controllers/facultycontroller"); // Path to the controller
  
const router = express.Router();

router.post("/addfaculty", addFaculty); // Add new faculty
router.get("/getfaculty", getAllFaculty); // Get all faculty
router.get("/:id", getFacultyById); // Get faculty by ID
router.put("/:id", updateFaculty); // Update faculty by ID
router.delete("/:id", deleteFaculty); // Delete faculty by ID

module.exports = router;
