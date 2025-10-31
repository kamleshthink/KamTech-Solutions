const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\d\s\-\+\(\)]+$/, 'Please provide a valid phone number']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    minlength: [10, 'Message must be at least 10 characters'],
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  projectBudget: {
    type: String,
    enum: ['less-than-1k', '1k-5k', '5k-10k', '10k-50k', '50k-plus', 'not-specified'],
    default: 'not-specified'
  },
  projectType: {
    type: String,
    enum: ['web-development', 'mobile-app', 'ml-ai', 'full-stack', 'consulting', 'other'],
    default: 'other'
  },
  urgency: {
    type: String,
    enum: ['urgent', 'normal', 'flexible'],
    default: 'normal'
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'in-progress', 'completed', 'archived'],
    default: 'new'
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  }
}, {
  timestamps: true
});

// Indexes
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ email: 1 });

module.exports = mongoose.model('Contact', contactSchema);
