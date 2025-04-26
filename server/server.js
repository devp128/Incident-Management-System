const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const incidentRoutes = require('./routes/incidents');

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'https://incident-management-system-mauve.vercel.app'],
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 600, // Cache preflight request for 10 minutes
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS middleware before other middleware
app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/incidents', incidentRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-safety-incidents')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 