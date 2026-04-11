const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a client name'],
      unique: true,
      trim: true,
      maxlength: [100, 'Client name cannot exceed 100 characters']
    },
    logo: {
      type: String,
      default: null
    },
    category: {
      type: String,
      required: [true, 'Please specify client category'],
      enum: [
        'AgriTech',
        'Construction Engineering',
        'Professional Community',
        'Community Platform',
        'Digital Agency',
        'IT Consulting',
        'Food & Delivery',
        'Job Board',
        'Freelance Marketplace',
        'News Portal',
        'Technology Partner',
        'Other'
      ]
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    website: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(v);
        },
        message: 'Invalid website URL'
      }
    },
    featured: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'archived'],
      default: 'active'
    },
    contact: {
      email: String,
      phone: String,
      name: String
    },
    projects: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }],
    metrics: {
      projectsCompleted: {
        type: Number,
        default: 0
      },
      successRate: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      },
      avgRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      }
    },
    tags: [String],
    notes: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    }
  },
  {
    timestamps: true
  }
);

// Index for better query performance
clientSchema.index({ featured: 1, status: 1 });
clientSchema.index({ category: 1 });

// Virtual for client display name with metrics
clientSchema.virtual('displayInfo').get(function() {
  return {
    name: this.name,
    category: this.category,
    projectsCompleted: this.metrics.projectsCompleted,
    successRate: this.metrics.successRate,
    avgRating: this.metrics.avgRating,
    featured: this.featured
  };
});

module.exports = mongoose.model('Client', clientSchema);
