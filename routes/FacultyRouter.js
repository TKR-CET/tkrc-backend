const express = require("express");
const multer = require("multer");
const path = require("path");
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
// Set up Multer again for this file (if not already imported in server.js)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Destination folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // File name
  },
});

const upload = multer({ storage: storage });

router.post("/addfaculty", upload.single("image"), addFaculty);// Add new faculty
router.get("/getfaculty", getAllFaculty); // Get all faculty
router.get("/:id", getFacultyById); // Get a faculty by ID
router.put("/:id", updateFaculty); // Update faculty
router.delete("/:id", deleteFaculty); // Delete faculty
router.get("/:id/timetable", getFacultyTimetable); // Get faculty timetable
router.put("/update/:id/timetable", updateFacultyTimetable); // Update faculty timetable
router.post("/login", loginFaculty);
module.exports = router;
