const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const attendanceRoutes = require("./routes/attendanceRoutes");
const facultyroutes =require("./router/facultyrouter");

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable for PORT or default to 5000

// Middleware
app.use(express.json());

const corsOptions = {
  origin: ["https://tkrcet.vercel.app", "http://localhost:5173"], // Define an array of allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// MongoDB connection
mongoose
    .connect("mongodb+srv://tkrcet:abc1234@cluster0.y4apc.mongodb.net/tkrcet")
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.error("MongoDB connection failed:", error.message));


// Routes
app.use("/attendance", attendanceRoutes);
app.use("/api/faculty", facultyroutes);

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
