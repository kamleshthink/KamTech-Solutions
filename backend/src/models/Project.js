const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  detailedDescription: {
    type: String,
    maxlength: [5000, 'Detailed description cannot exceed 5000 characters']
  },
  image: {
    type: String,
    required: [true, 'Project image is required']
  },
  gallery: [{
    type: String,
    trim: true
  }],
  screenshots: [{
    url: { type: String, required: true },
    caption: { type: String, default: '' },
    order: { type: Number, default: 0 }
  }],
  technologies: [{
    type: String,
    required: true
  }],
  githubUrl: {
    type: String,
    trim: true
  },
  liveUrl: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['web', 'mobile', 'ml', 'other'],
    lowercase: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  stats: {
    type: Map,
    of: String
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster queries
projectSchema.index({ category: 1, featured: -1, order: 1 });
projectSchema.index({ isActive: 1 });

module.exports = mongoose.model('Project', projectSchema);
