const Client = require('../models/Client');

/**
 * Get all active clients
 * GET /api/clients
 */
exports.getAllClients = async (req, res) => {
  try {
    const { featured, category, limit = 50, skip = 0 } = req.query;
    
    let query = { status: 'active' };
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    if (category) {
      query.category = category;
    }

    const clients = await Client.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ featured: -1, createdAt: -1 });

    const total = await Client.countDocuments(query);

    res.status(200).json({
      success: true,
      count: clients.length,
      total,
      data: clients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching clients',
      error: error.message
    });
  }
};

/**
 * Get featured clients only
 * GET /api/clients/featured
 */
exports.getFeaturedClients = async (req, res) => {
  try {
    const clients = await Client.find({ status: 'active', featured: true })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: clients.length,
      data: clients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured clients',
      error: error.message
    });
  }
};

/**
 * Get single client by ID
 * GET /api/clients/:id
 */
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
      .populate('projects', 'title description image');

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    res.status(200).json({
      success: true,
      data: client
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching client',
      error: error.message
    });
  }
};

/**
 * Get clients by category
 * GET /api/clients/category/:category
 */
exports.getClientsByCategory = async (req, res) => {
  try {
    const clients = await Client.find({
      status: 'active',
      category: req.params.category
    }).sort({ featured: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: clients.length,
      data: clients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching clients by category',
      error: error.message
    });
  }
};

/**
 * Get client statistics
 * GET /api/clients/stats
 */
exports.getClientStats = async (req, res) => {
  try {
    const totalClients = await Client.countDocuments({ status: 'active' });
    const featuredClients = await Client.countDocuments({ status: 'active', featured: true });
    
    const stats = await Client.aggregate([
      { $match: { status: 'active' } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgSuccessRate: { $avg: '$metrics.successRate' },
          avgRating: { $avg: '$metrics.avgRating' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalClients,
        featuredClients,
        byCategory: stats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching client statistics',
      error: error.message
    });
  }
};

/**
 * Create a new client (admin only)
 * POST /api/clients
 */
exports.createClient = async (req, res) => {
  try {
    const { name, logo, category, description, website, featured, contact, tags } = req.body;

    // Validate required fields
    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name and category'
      });
    }

    const client = await Client.create({
      name,
      logo,
      category,
      description,
      website,
      featured,
      contact,
      tags,
      createdBy: req.admin._id
    });

    res.status(201).json({
      success: true,
      data: client
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating client',
      error: error.message
    });
  }
};

/**
 * Update client (admin only)
 * PUT /api/clients/:id
 */
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    res.status(200).json({
      success: true,
      data: client
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating client',
      error: error.message
    });
  }
};

/**
 * Delete client (admin only)
 * DELETE /api/clients/:id
 */
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Client deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting client',
      error: error.message
    });
  }
};
