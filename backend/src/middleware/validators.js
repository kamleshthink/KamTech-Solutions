const { body, validationResult } = require('express-validator');

// Validation middleware
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

// Contact form validation rules
exports.contactValidationRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required')
    .isLength({ min: 5, max: 200 }).withMessage('Subject must be between 5 and 200 characters'),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters')
];

// Project validation rules
exports.projectValidationRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('Project title is required')
    .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),

  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),

  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['web', 'mobile', 'ml', 'other']).withMessage('Invalid category'),

  body('technologies')
    .isArray({ min: 1 }).withMessage('At least one technology is required')
];

// Testimonial validation rules
exports.testimonialValidationRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Client name is required')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),

  body('role')
    .trim()
    .notEmpty().withMessage('Role is required'),

  body('company')
    .trim()
    .notEmpty().withMessage('Company name is required'),

  body('rating')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),

  body('feedback')
    .trim()
    .notEmpty().withMessage('Feedback is required')
    .isLength({ min: 20, max: 1000 }).withMessage('Feedback must be between 20 and 1000 characters')
];
