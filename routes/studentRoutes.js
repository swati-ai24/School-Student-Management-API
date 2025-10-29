const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Add new student
router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get single student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.params.id });
    student
      ? res.json(student)
      : res.status(404).json({ message: 'Student not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update student
router.put('/:id', async (req, res) => {
  try {
    const updated = await Student.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    updated
      ? res.json(updated)
      : res.status(404).json({ message: 'Student not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Delete student
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Student.findOneAndDelete({ id: req.params.id });
    deleted
      ? res.json({ message: 'Deleted successfully' })
      : res.status(404).json({ message: 'Student not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
