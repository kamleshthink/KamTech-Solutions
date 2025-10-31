const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  role: {
    type: String,
    required: [true, 'Client role/position is required'],
    trim: true,
    maxlength: [150, 'Role cannot exceed 150 characters']
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [150, 'Company name cannot exceed 150 characters']
  },
  image: {
    type: String,
    default: '/Assets/default-avatar.png'
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    default: 5
  },
  feedback: {
    type: String,
    required: [true, 'Feedback text is required'],
    minlength: [20, 'Feedback must be at least 20 characters'],
    maxlength: [1000, 'Feedback cannot exceed 1000 characters']
  },
  platform: {
    type: String,
    enum: ['fiverr', 'upwork', 'freelancer', 'linkedin', 'direct', 'other'],
    default: 'direct',
    lowercase: true
  },
  projectType: {
    type: String,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster queries
testimonialSchema.index({ featured: -1, rating: -1, order: 1 });
testimonialSchema.index({ isActive: 1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);
