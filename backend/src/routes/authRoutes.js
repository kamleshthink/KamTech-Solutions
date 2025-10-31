const express = require('express');
const router = express.Router();
const {
  login,
  register,
  getMe,
  updatePassword
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/password', protect, updatePassword);

// Super admin only route
router.post('/register', protect, authorize('super-admin'), register);

module.exports = router;
