const express = require('express');
const router = express.Router();
const {
  getAllClients,
  getFeaturedClients,
  getClientById,
  getClientsByCategory,
  getClientStats,
  createClient,
  updateClient,
  deleteClient
} = require('../controllers/clientController');
const { protect, authorize } = require('../middleware/auth');

/**
 * Public Routes
 */

// Get all clients
router.get('/', getAllClients);

// Get featured clients
router.get('/featured', getFeaturedClients);

// Get clients by category
router.get('/category/:category', getClientsByCategory);

// Get single client
router.get('/:id', getClientById);

// Get client statistics
router.get('/stats/overview', getClientStats);

/**
 * Protected Routes (Admin only)
 */

// Create client
router.post('/', protect, authorize('admin', 'super-admin'), createClient);

// Update client
router.put('/:id', protect, authorize('admin', 'super-admin'), updateClient);

// Delete client
router.delete('/:id', protect, authorize('admin', 'super-admin'), deleteClient);

module.exports = router;
