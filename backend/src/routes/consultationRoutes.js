const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {
  submitConsultation,
  getAllConsultations,
  getConsultationById,
  updateConsultation,
  deleteConsultation
} = require('../controllers/consultationController');
const { protect } = require('../middleware/auth');

// Rate limiter for consultation bookings (max 2 per hour per IP)
const consultationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 2,
  message: {
    success: false,
    message: 'Too many consultation requests from this IP, please try again after an hour'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Public routes
// Rate limiter disabled in development for testing
router.post(
  '/',
  process.env.NODE_ENV === 'production' ? consultationLimiter : (req, res, next) => next(),
  submitConsultation
);

// Admin routes (protected)
router.get('/', protect, getAllConsultations);
router.get('/:id', protect, getConsultationById);
router.put('/:id', protect, updateConsultation);
router.delete('/:id', protect, deleteConsultation);

module.exports = router;
