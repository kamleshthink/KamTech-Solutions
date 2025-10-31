const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {
  submitBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

// Rate limiter for booking submissions (max 3 per hour per IP)
const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: {
    success: false,
    message: 'Too many booking submissions from this IP, please try again after an hour'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Public routes
router.post(
  '/',
  bookingLimiter,
  upload.array('files', 10), // Allow up to 10 files
  submitBooking
);

// Admin routes (protected)
router.get('/', protect, getAllBookings);
router.get('/:id', protect, getBookingById);
router.put('/:id', protect, updateBookingStatus);
router.delete('/:id', protect, deleteBooking);

module.exports = router;
