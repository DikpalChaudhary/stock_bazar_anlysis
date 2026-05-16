const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A news title is required'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'News content is required'],
  },
  summary: {
    type: String,
    required: [true, 'A brief summary is required'],
  },
  category: {
    type: String,
    required: true,
    enum: ['Market', 'Gold/Silver', 'IPO/FPO', 'Economy', 'Banking', 'International'], // Limits categories to these specific values
  },
  tags: {
    type: [String], // Array of strings
    default: [],
  },
  isBreaking: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true // Automatically adds updatedAt and createdAt fields
});

// Create the model
const News = mongoose.model('News', newsSchema);

module.exports = News;