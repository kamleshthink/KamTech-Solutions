const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectStats
} = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/auth');
const { projectValidationRules, validate } = require('../middleware/validators');

// Public routes
router.get('/', getAllProjects);
router.get('/stats', getProjectStats);
router.get('/:id', getProjectById);

// Protected routes (Admin only)
router.post('/',
  protect,
  projectValidationRules,
  validate,
  createProject
);

router.put('/:id',
  protect,
  projectValidationRules,
  validate,
  updateProject
);

router.delete('/:id',
  protect,
  deleteProject
);

module.exports = router;
