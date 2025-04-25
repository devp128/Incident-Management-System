const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');

// GET all incidents
router.get('/', async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ reported_at: -1 });
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single incident
router.get('/:id', async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    res.json(incident);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new incident
router.post('/', async (req, res) => {
  const { title, description, severity } = req.body;

  // Validate required fields
  if (!title || !description || !severity) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // Validate severity
  if (!['Low', 'Medium', 'High'].includes(severity)) {
    return res.status(400).json({ message: 'Severity must be Low, Medium, or High' });
  }

  const incident = new Incident({
    title,
    description,
    severity
  });

  try {
    const newIncident = await incident.save();
    res.status(201).json(newIncident);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an incident
router.delete('/:id', async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    await incident.deleteOne();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 