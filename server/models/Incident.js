const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  severity: {
    type: String,
    required: [true, 'Severity is required'],
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  reported_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Incident', incidentSchema); 