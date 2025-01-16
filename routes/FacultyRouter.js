const express = require("express");
const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudnaryConfig.js");

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "faculty-images", // Folder in your Cloudinary account
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed image formats
  },
});

// Configure Multer to use Cloudinary storage
const upload = multer({ storage });


const {
  addFaculty,
  updateFaculty,
getTodayTimetableByFacultyId,
  getAllFaculty,
  getFacultyById,
  deleteFaculty,
  getFacultyTimetable,
  updateFacultyTimetable,
  loginFaculty,
} = require("../controllers/FacultyController");

const router = express.Router();

// Routes
router.post("/addfaculty", upload.single("image"), addFaculty);
router.put("/update/:id", upload.single("image"), updateFaculty);
router.get("/:facultyId/timetable-today", getTodayTimetableByFacultyId);
router.get("/getfaculty", getAllFaculty);
router.get("/:id", getFacultyById);
router.delete("/:id", deleteFaculty);
router.get("/:id/timetable", getFacultyTimetable);
router.put("/:id/timetable", updateFacultyTimetable);
router.post("/login", loginFaculty);

module.exports = router;
