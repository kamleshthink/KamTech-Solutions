const path = require('path');

// Load .env file only in development (for local environment)
// In production (Render), environment variables are set via dashboard
if (process.env.NODE_ENV !== 'production') {
  const envPath = path.join(__dirname, '..', '.env');
  const dotenvResult = require('dotenv').config({ path: envPath });
  if (dotenvResult.error) {
    console.log('⚠️  .env file not found, using system environment variables');
  } else {
    console.log('✅ .env file loaded from:', envPath);
  }
}

// Verify required environment variables
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is not set!');
  console.log('Please set MONGODB_URI in your environment or .env file');
  process.exit(1);
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const projectRoutes = require('./routes/projectRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const cookieConsentRoutes = require('./routes/cookieConsentRoutes');
const { cloudinary } = require('./config/cloudinary');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Verify Cloudinary configuration
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
  console.log('☁️  Cloudinary Connected:', process.env.CLOUDINARY_CLOUD_NAME);
} else {
  console.warn('⚠️  Cloudinary credentials not configured');
}

// Middleware
app.use(helmet()); // Security headers

// CORS configuration - Allow multiple origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://kamtech-solutions.onrender.com',
  process.env.FRONTEND_URL
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('❌ CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/cookie-consent', cookieConsentRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 Kamlesh Portfolio Backend Server                    ║
║                                                           ║
║   📡 Server running on port: ${PORT}                      ║
║   🌍 Environment: ${process.env.NODE_ENV || 'development'}               ║
║   📅 Started at: ${new Date().toLocaleString()}          ║
║                                                           ║
║   API Documentation:                                      ║
║   • GET  /api/health          - Health check             ║
║   • GET  /api/projects        - Get all projects         ║
║   • GET  /api/testimonials    - Get testimonials         ║
║   • POST /api/contact         - Submit contact form      ║
║   • POST /api/auth/login      - Admin login              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  process.exit(1);
});
