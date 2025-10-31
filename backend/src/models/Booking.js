const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  // Step 1: Basic Information
  clientName: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  companyName: {
    type: String,
    trim: true
  },

  // Step 2: Project Details
  projectType: {
    type: String,
    required: [true, 'Project type is required'],
    enum: [
      'Website Development',
      'Mobile App Development',
      'E-Commerce Platform',
      'Web Application',
      'Landing Page',
      'Portfolio Website',
      'Business Website',
      'Blog/Content Platform',
      'SaaS Application',
      'Custom Software'
    ]
  },
  projectCategory: {
    type: String,
    required: [true, 'Project category is required'],
    enum: [
      'Startup MVP',
      'Enterprise Solution',
      'Small Business',
      'Personal Project',
      'Non-Profit',
      'Educational',
      'Healthcare',
      'Finance',
      'E-learning',
      'Other'
    ]
  },
  projectDomain: {
    type: String,
    required: [true, 'Project domain is required'],
    enum: [
      'AgriTech',
      'E-Commerce',
      'Healthcare',
      'Education',
      'Finance',
      'Construction',
      'Real Estate',
      'Food & Beverage',
      'Travel & Tourism',
      'Technology',
      'Social Networking',
      'Entertainment',
      'Other'
    ]
  },
  projectTimeline: {
    type: String,
    required: [true, 'Project timeline is required'],
    enum: [
      'Less than 1 week',
      '1-2 weeks',
      '2-4 weeks',
      '1-2 months',
      '2-3 months',
      '3-6 months',
      '6+ months',
      'Flexible'
    ]
  },
  budget: {
    type: String,
    required: [true, 'Budget is required'],
    enum: [
      '₹10,000 - ₹25,000',
      '₹25,000 - ₹50,000',
      '₹50,000 - ₹1,00,000',
      '₹1,00,000 - ₹2,50,000',
      '₹2,50,000 - ₹5,00,000',
      '₹5,00,000+',
      'To be discussed'
    ]
  },

  // Step 3: Technical Requirements
  platformType: [{
    type: String,
    enum: [
      'Web Application',
      'iOS App',
      'Android App',
      'Progressive Web App (PWA)',
      'Desktop Application',
      'Responsive Website'
    ]
  }],
  frontendFeatures: [{
    type: String
  }],
  backendFeatures: [{
    type: String
  }],
  designPreference: {
    type: String,
    enum: [
      'Modern & Minimalist',
      'Bold & Colorful',
      'Professional & Corporate',
      'Creative & Artistic',
      'Elegant & Sophisticated',
      'Playful & Fun',
      'Classic & Traditional',
      'You decide (Designer\'s Choice)',
      ''
    ]
  },

  // Step 4: Additional Details
  projectDescription: {
    type: String,
    required: [true, 'Project description is required']
  },
  referenceWebsites: {
    type: String
  },
  specialRequirements: {
    type: String
  },

  // Step 5: Optional Company Info & Assets
  companyDescription: {
    type: String
  },
  targetAudience: {
    type: String
  },
  brandGuidelines: {
    type: String
  },

  // File uploads (URLs to Cloudinary)
  uploadedFiles: [{
    url: String,
    publicId: String,
    fileName: String,
    fileType: String,
    fileSize: Number
  }],

  // Booking Status
  status: {
    type: String,
    enum: ['pending', 'contacted', 'in-discussion', 'quoted', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  },

  // Internal notes (admin only)
  adminNotes: {
    type: String
  },

  // Quoted price (admin only)
  quotedPrice: {
    type: Number
  }
}, {
  timestamps: true
});

// Indexes for better query performance
bookingSchema.index({ email: 1 });
bookingSchema.index({ status: 1, createdAt: -1 });
bookingSchema.index({ projectType: 1, projectDomain: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
