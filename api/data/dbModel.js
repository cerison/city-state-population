// models/population.js
const mongoose = require('mongoose');

// Define the population schema
const populationSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
    lowercase: true,
  },
  city: {
    type: String,
    required: true,
    lowercase: true,
  },
  population: {
    type: Number,
    required: true,
  },
});

// Create the population model
mongoose.model('Population', populationSchema, 'population');
