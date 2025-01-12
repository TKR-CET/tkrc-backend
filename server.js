const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const facultyroutes = require("./routes/FacultyRouter");
const subjectsroutes = require("./routes/subjectsrouter");
const studentrouter = require("./routes/studentsrouter");
const AttendanceRoute = require("./routes/AttendanceRouter");
const SectionRoute = require("./routes/StudentSectionRouter");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
// CORS settings
const corsOptions = {
  origin: ["https://tkrcet.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// MongoDB connection
mongoose
  .connect("mongodb+srv://tkrcet:abc1234@cluster0.y4apc.mongodb.net/tkrcet")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

// Routes
app.use("/faculty", facultyroutes); // No need for upload.single here
app.use("/subjects", subjectsroutes);
app.use("/students", studentrouter);
app.use("/Attendance", AttendanceRoute);
app.use("/Section", SectionRoute);

// Default route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the TKRCET Attendance API!");
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
