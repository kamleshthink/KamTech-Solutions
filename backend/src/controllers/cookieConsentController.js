const CookieConsent = require('../models/CookieConsent');

// Save or update cookie consent
const saveCookieConsent = async (req, res) => {
  try {
    const { userId, acceptedCategories, timestamp, userAgent, preferences } = req.body;

    // Validate required fields
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    if (!acceptedCategories || !Array.isArray(acceptedCategories)) {
      return res.status(400).json({
        success: false,
        message: 'Accepted categories must be an array'
      });
    }

    // Get IP address from request
    const ipAddress = req.headers['x-forwarded-for'] ||
                     req.connection.remoteAddress ||
                     req.socket.remoteAddress ||
                     req.ip;

    // Create consent data
    const consentData = {
      userId,
      acceptedCategories,
      ipAddress,
      userAgent: userAgent || req.headers['user-agent'],
      timestamp: timestamp ? new Date(timestamp) : new Date(),
      preferences: preferences || {
        essential: true,
        analytics: acceptedCategories.includes('analytics'),
        marketing: acceptedCategories.includes('marketing'),
      },
    };

    // Save to database
    const consent = new CookieConsent(consentData);
    await consent.save();

    res.status(201).json({
      success: true,
      message: 'Cookie consent saved successfully',
      data: {
        id: consent._id,
        userId: consent.userId,
        acceptedCategories: consent.acceptedCategories,
        timestamp: consent.timestamp,
      },
    });
  } catch (error) {
    console.error('Error saving cookie consent:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save cookie consent',
      error: error.message,
    });
  }
};

// Get user's latest consent
const getUserConsent = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    // Get latest consent for the user
    const consent = await CookieConsent.getLatestConsent(userId);

    if (!consent) {
      return res.status(404).json({
        success: false,
        message: 'No consent found for this user'
      });
    }

    res.status(200).json({
      success: true,
      data: consent,
    });
  } catch (error) {
    console.error('Error fetching user consent:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user consent',
      error: error.message,
    });
  }
};

// Get user's consent history
const getUserConsentHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 10;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const history = await CookieConsent.getConsentHistory(userId, limit);

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    console.error('Error fetching consent history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch consent history',
      error: error.message,
    });
  }
};

// Get all consents (Admin only)
const getAllConsents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    // Get consents with pagination
    const consents = await CookieConsent.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count
    const total = await CookieConsent.countDocuments();

    res.status(200).json({
      success: true,
      data: consents,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error('Error fetching all consents:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch consents',
      error: error.message,
    });
  }
};

// Get consent statistics (Admin only)
const getConsentStats = async (req, res) => {
  try {
    const stats = await CookieConsent.getConsentStats();

    // Get consents by date (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentConsents = await CookieConsent.aggregate([
      {
        $match: {
          timestamp: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Get unique users
    const uniqueUsers = await CookieConsent.distinct('userId');

    res.status(200).json({
      success: true,
      data: {
        ...stats,
        uniqueUsers: uniqueUsers.length,
        recentConsents,
      },
    });
  } catch (error) {
    console.error('Error fetching consent stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch consent statistics',
      error: error.message,
    });
  }
};

// Delete user consent (GDPR compliance)
const deleteUserConsent = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    // Delete all consents for the user
    const result = await CookieConsent.deleteMany({ userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'No consent found for this user'
      });
    }

    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} consent record(s)`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('Error deleting user consent:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user consent',
      error: error.message,
    });
  }
};

module.exports = {
  saveCookieConsent,
  getUserConsent,
  getUserConsentHistory,
  getAllConsents,
  getConsentStats,
  deleteUserConsent,
};
