const express = require('express');
const router = express.Router();
const {
  saveCookieConsent,
  getUserConsent,
  getUserConsentHistory,
  getAllConsents,
  getConsentStats,
  deleteUserConsent,
} = require('../controllers/cookieConsentController');

// Public routes
/**
 * @route   POST /api/cookie-consent
 * @desc    Save user's cookie consent preferences
 * @access  Public
 */
router.post('/', saveCookieConsent);

/**
 * @route   GET /api/cookie-consent/:userId
 * @desc    Get latest consent for a specific user
 * @access  Public
 */
router.get('/:userId', getUserConsent);

/**
 * @route   GET /api/cookie-consent/:userId/history
 * @desc    Get consent history for a specific user
 * @access  Public
 */
router.get('/:userId/history', getUserConsentHistory);

/**
 * @route   DELETE /api/cookie-consent/:userId
 * @desc    Delete all consent records for a user (GDPR compliance)
 * @access  Public (should be protected in production)
 */
router.delete('/:userId', deleteUserConsent);

// Admin routes (should be protected with authentication middleware in production)
/**
 * @route   GET /api/cookie-consent/admin/all
 * @desc    Get all cookie consents with pagination
 * @access  Admin
 * @note    Add authentication middleware in production
 */
router.get('/admin/all', getAllConsents);

/**
 * @route   GET /api/cookie-consent/admin/stats
 * @desc    Get cookie consent statistics
 * @access  Admin
 * @note    Add authentication middleware in production
 */
router.get('/admin/stats', getConsentStats);

module.exports = router;
