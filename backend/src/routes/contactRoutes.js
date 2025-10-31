const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {
  submitContact,
  getAllContacts,
  updateContactStatus,
  deleteContact
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');
const { contactValidationRules, validate } = require('../middleware/validators');

// Rate limiter for contact form (max 3 submissions per hour per IP)
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: {
    success: false,
    message: 'Too many contact form submissions from this IP, please try again after an hour'
  }
});

// Public route
router.post('/',
  contactLimiter,
  contactValidationRules,
  validate,
  submitContact
);

// Protected routes (Admin only)
router.get('/', protect, getAllContacts);
router.put('/:id', protect, updateContactStatus);
router.delete('/:id', protect, deleteContact);

module.exports = router;
