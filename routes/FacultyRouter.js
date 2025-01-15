const express = require("express");
const multer = require("multer"); 
const path = require("path");
 // Import multer for handling file uploads
const {
  addFaculty, 
  updateFaculty,
getTodayTimetableByFacultyId,
  getAllFaculty,
  getFacultyById,
  deleteFaculty,
  getFacultyTimetable,
  updateFacultyTimetable,
  loginFaculty
} = require("../controllers/FacultyController");

const router = express.Router();




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads"); // Ensure this path exists
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });




// Add faculty with image upload
router.post("/addfaculty", upload.single("image"), addFaculty);


// Update faculty with image upload
router.put("/update/:id",upload.single('image'),updateFaculty);
router.get("/faculty/:facultyId/timetable-today", getTodayTimetableByFacultyId);
router.get("/getfaculty", getAllFaculty); // Get all faculty
router.get("/:id", getFacultyById); // Get a faculty by ID/ Update faculty
router.delete("/:id", deleteFaculty); // Delete faculty
router.get("/:id/timetable", getFacultyTimetable); // Get faculty timetable
router.put("/:id/timetable", updateFacultyTimetable); // Update faculty timetable
router.post("/login", loginFaculty);

module.exports = router;
