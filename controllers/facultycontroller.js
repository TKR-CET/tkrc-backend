// Add a new faculty member

const express = require("express");
const Faculty = require("../models/facultymodel.js"); // Path to the Faculty model
     
const addFaculty = async (req, res) => {
  try {
    const { name, facultyId, image, role, department, timetable } = req.body;

    const newFaculty = new Faculty({
      name,
      facultyId,
      image,
      role,
      department,
      timetable,
    });

    await newFaculty.save();
    res.status(201).json({ message: "Faculty added successfully!", faculty: newFaculty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all faculty members
const getAllFaculty = async (req, res) => {
  try {
    const facultyList = await Faculty.find();
    res.status(200).json(facultyList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single faculty member by ID
const getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.status(200).json(faculty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a faculty member
const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedFaculty = await Faculty.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.status(200).json({ message: "Faculty updated successfully", faculty: updatedFaculty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a faculty member
const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFaculty = await Faculty.findByIdAndDelete(id);

    if (!deletedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports={addFaculty,getAllFaculty,getFacultyById,updateFaculty,deleteFaculty}

