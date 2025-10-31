const express = require('express');
const router = express.Router();
const {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getTestimonialStats
} = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');
const { testimonialValidationRules, validate } = require('../middleware/validators');

// Public routes
router.get('/', getAllTestimonials);
router.get('/stats', getTestimonialStats);
router.get('/:id', getTestimonialById);

// Protected routes (Admin only)
router.post('/',
  protect,
  testimonialValidationRules,
  validate,
  createTestimonial
);

router.put('/:id',
  protect,
  testimonialValidationRules,
  validate,
  updateTestimonial
);

router.delete('/:id',
  protect,
  deleteTestimonial
);

module.exports = router;
