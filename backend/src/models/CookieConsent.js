const mongoose = require('mongoose');

const cookieConsentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
    trim: true,
  },
  acceptedCategories: {
    type: [String],
    required: true,
    enum: ['essential', 'analytics', 'marketing'],
    default: ['essential'],
  },
  ipAddress: {
    type: String,
    trim: true,
    default: null,
  },
  userAgent: {
    type: String,
    trim: true,
    default: null,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
  preferences: {
    essential: {
      type: Boolean,
      default: true,
      required: true,
    },
    analytics: {
      type: Boolean,
      default: false,
    },
    marketing: {
      type: Boolean,
      default: false,
    },
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
  collection: 'cookieconsents',
});

// Index for faster queries
cookieConsentSchema.index({ userId: 1, timestamp: -1 });
cookieConsentSchema.index({ createdAt: -1 });

// Update the updatedAt field before saving
cookieConsentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Method to check if a specific category is accepted
cookieConsentSchema.methods.hasAccepted = function(category) {
  return this.acceptedCategories.includes(category);
};

// Static method to get latest consent for a user
cookieConsentSchema.statics.getLatestConsent = async function(userId) {
  return this.findOne({ userId }).sort({ timestamp: -1 });
};

// Static method to get consent history for a user
cookieConsentSchema.statics.getConsentHistory = async function(userId, limit = 10) {
  return this.find({ userId })
    .sort({ timestamp: -1 })
    .limit(limit);
};

// Static method to get consent statistics
cookieConsentSchema.statics.getConsentStats = async function() {
  const totalConsents = await this.countDocuments();

  const analyticsAccepted = await this.countDocuments({
    acceptedCategories: 'analytics'
  });

  const marketingAccepted = await this.countDocuments({
    acceptedCategories: 'marketing'
  });

  const essentialOnly = await this.countDocuments({
    acceptedCategories: { $size: 1, $in: ['essential'] }
  });

  return {
    total: totalConsents,
    analyticsAccepted,
    marketingAccepted,
    essentialOnly,
    analyticsPercentage: totalConsents > 0 ? ((analyticsAccepted / totalConsents) * 100).toFixed(2) : 0,
    marketingPercentage: totalConsents > 0 ? ((marketingAccepted / totalConsents) * 100).toFixed(2) : 0,
  };
};

// Virtual for formatted timestamp
cookieConsentSchema.virtual('formattedTimestamp').get(function() {
  return this.timestamp.toLocaleString();
});

// Ensure virtuals are included in JSON output
cookieConsentSchema.set('toJSON', { virtuals: true });
cookieConsentSchema.set('toObject', { virtuals: true });

const CookieConsent = mongoose.model('CookieConsent', cookieConsentSchema);

module.exports = CookieConsent;
