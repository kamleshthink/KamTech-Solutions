const Booking = require('../models/Booking');
const { deleteFromCloudinary } = require('../config/cloudinary');
const nodemailer = require('nodemailer');

const safeFetch = async (...args) => {
  if (typeof fetch !== 'undefined') return fetch(...args);
  try {
    const nodeFetch = require('node-fetch');
    return nodeFetch(...args);
  } catch (err) {
    console.error('Fetch is not available and node-fetch is not installed. Telegram notifications will not be sent.', err);
    throw err;
  }
};

const createBookingTransporter = ({ port, secure }) => {
  const transporterOptions = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port,
    secure,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1.2'
    },
    connectionTimeout: process.env.EMAIL_CONNECTION_TIMEOUT ? parseInt(process.env.EMAIL_CONNECTION_TIMEOUT, 10) : 30000,
    greetingTimeout: process.env.EMAIL_GREETING_TIMEOUT ? parseInt(process.env.EMAIL_GREETING_TIMEOUT, 10) : 20000,
    socketTimeout: process.env.EMAIL_SOCKET_TIMEOUT ? parseInt(process.env.EMAIL_SOCKET_TIMEOUT, 10) : 30000
  };

  if (!secure) {
    transporterOptions.requireTLS = true;
  }

  return nodemailer.createTransport(transporterOptions);
};

const getBookingTransporter = () => {
  const port = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 587;
  const secureEnv = typeof process.env.EMAIL_SECURE === 'string'
    ? process.env.EMAIL_SECURE.toLowerCase() === 'true'
    : undefined;
  const secure = secureEnv !== undefined ? secureEnv : port === 465;

  return createBookingTransporter({ port, secure });
};

const sendBookingMail = async (mailOptions) => {
  const port = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 587;
  const secureEnv = typeof process.env.EMAIL_SECURE === 'string'
    ? process.env.EMAIL_SECURE.toLowerCase() === 'true'
    : undefined;
  const secure = secureEnv !== undefined ? secureEnv : port === 465;

  const transporter = createBookingTransporter({ port, secure });
  console.log('🔧 Booking mail transport:', { host: process.env.EMAIL_HOST, port, secure });

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Booking mail send failed:', error);
    if (error && error.code === 'ETIMEDOUT') {
      if (secure) {
        console.log('🔧 Booking mail timeout on secure 465, retrying with port 587 and STARTTLS');
        const fallbackTransporter = createBookingTransporter({ port: 587, secure: false });
        return await fallbackTransporter.sendMail(mailOptions);
      }
      console.log('🔧 Booking mail timeout on non-secure 587, retrying with port 465 and secure=true');
      const fallbackTransporter = createBookingTransporter({ port: 465, secure: true });
      return await fallbackTransporter.sendMail(mailOptions);
    }
    throw error;
  }
};

const sendBookingTelegramNotification = async (bookingData) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return;
  }

  const messageText = `New booking received from ${bookingData.clientName} (${bookingData.email})\n` +
    `Phone: ${bookingData.phone || 'N/A'}\n` +
    `Company: ${bookingData.companyName || 'N/A'}\n` +
    `Project: ${bookingData.projectType || 'N/A'}\n` +
    `Budget: ${bookingData.budget || 'N/A'}\n` +
    `Timeline: ${bookingData.projectTimeline || 'N/A'}\n\n` +
    `Message:\n${bookingData.projectDescription || 'N/A'}`;

  try {
    await safeFetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: messageText })
    });
  } catch (err) {
    console.error('Booking Telegram notification failed:', err);
  }
};

// @desc    Submit booking form
// @route   POST /api/bookings
// @access  Public
exports.submitBooking = async (req, res, next) => {
  try {
    console.log('📨 Booking submission received');
    console.log('📋 Request body:', req.body);
    console.log('📎 Files:', req.files ? req.files.length : 0);

    const {
      clientName,
      email,
      phone,
      companyName,
      projectType,
      projectCategory,
      projectDomain,
      projectTimeline,
      budget,
      platformType,
      frontendFeatures,
      backendFeatures,
      designPreference,
      projectDescription,
      referenceWebsites,
      specialRequirements,
      companyDescription,
      targetAudience,
      brandGuidelines
    } = req.body;

    // Parse JSON strings for arrays
    const parsedPlatformType = platformType ? JSON.parse(platformType) : [];
    const parsedFrontendFeatures = frontendFeatures ? JSON.parse(frontendFeatures) : [];
    const parsedBackendFeatures = backendFeatures ? JSON.parse(backendFeatures) : [];

    // Process uploaded files
    const uploadedFiles = req.files ? req.files.map(file => ({
      url: file.path,
      publicId: file.filename,
      fileName: file.originalname,
      fileType: file.mimetype,
      fileSize: file.size
    })) : [];

    // Create booking entry
    const booking = await Booking.create({
      clientName,
      email,
      phone,
      companyName,
      projectType,
      projectCategory,
      projectDomain,
      projectTimeline,
      budget,
      platformType: parsedPlatformType,
      frontendFeatures: parsedFrontendFeatures,
      backendFeatures: parsedBackendFeatures,
      designPreference,
      projectDescription,
      referenceWebsites,
      specialRequirements,
      companyDescription,
      targetAudience,
      brandGuidelines,
      uploadedFiles
    });

    // Send email notification to admin (non-blocking - background)
    setImmediate(() => {
      console.log('🔧 Booking transporter config:', {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE,
        user: process.env.EMAIL_USER ? process.env.EMAIL_USER.replace(/(.{2}).+(@.+)/, '$1****$2') : null
      });
      sendBookingMail({
        from: `"KamTech Solutions" <${process.env.EMAIL_USER}>`,
        to: process.env.CONTACT_EMAIL || 'kamleshsharma@gmail.com',
        subject: `🎯 New Project Booking: ${projectType} - ${clientName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 20px; border-radius: 0 0 10px 10px; }
              .section { background: white; padding: 15px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #3b82f6; }
              .section h3 { margin: 0 0 10px 0; color: #3b82f6; }
              .info-row { display: flex; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
              .info-label { font-weight: bold; width: 150px; color: #6b7280; }
              .info-value { flex: 1; color: #1f2937; }
              .badge { display: inline-block; padding: 4px 12px; background: #dbeafe; color: #1e40af; border-radius: 12px; font-size: 12px; margin: 2px; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">🎯 New Project Booking Received!</h2>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">A new client has submitted a detailed project booking</p>
              </div>

              <div class="content">
                <!-- Client Information -->
                <div class="section">
                  <h3>👤 Client Information</h3>
                  <div class="info-row">
                    <div class="info-label">Name:</div>
                    <div class="info-value">${clientName}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Email:</div>
                    <div class="info-value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Phone:</div>
                    <div class="info-value"><a href="tel:${phone}">${phone}</a></div>
                  </div>
                  ${companyName ? `
                  <div class="info-row">
                    <div class="info-label">Company:</div>
                    <div class="info-value">${companyName}</div>
                  </div>
                  ` : ''}
                </div>

                <!-- Project Details -->
                <div class="section">
                  <h3>📋 Project Details</h3>
                  <div class="info-row">
                    <div class="info-label">Project Type:</div>
                    <div class="info-value"><strong>${projectType}</strong></div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Category:</div>
                    <div class="info-value">${projectCategory}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Domain:</div>
                    <div class="info-value">${projectDomain}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Timeline:</div>
                    <div class="info-value">${projectTimeline}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Budget:</div>
                    <div class="info-value"><strong style="color: #16a34a;">${budget}</strong></div>
                  </div>
                </div>

                <!-- Technical Requirements -->
                <div class="section">
                  <h3>⚙️ Technical Requirements</h3>
                  <div class="info-row">
                    <div class="info-label">Platforms:</div>
                    <div class="info-value">
                      ${parsedPlatformType.map(p => `<span class="badge">${p}</span>`).join('')}
                    </div>
                  </div>
                  ${parsedFrontendFeatures.length > 0 ? `
                  <div class="info-row">
                    <div class="info-label">Frontend:</div>
                    <div class="info-value">
                      ${parsedFrontendFeatures.map(f => `<span class="badge">${f}</span>`).join('')}
                    </div>
                  </div>
                  ` : ''}
                  ${parsedBackendFeatures.length > 0 ? `
                  <div class="info-row">
                    <div class="info-label">Backend:</div>
                    <div class="info-value">
                      ${parsedBackendFeatures.map(f => `<span class="badge">${f}</span>`).join('')}
                    </div>
                  </div>
                  ` : ''}
                  ${designPreference ? `
                  <div class="info-row">
                    <div class="info-label">Design Style:</div>
                    <div class="info-value">${designPreference}</div>
                  </div>
                  ` : ''}
                </div>

                <!-- Project Description -->
                <div class="section">
                  <h3>📝 Project Description</h3>
                  <p style="margin: 0; white-space: pre-wrap;">${projectDescription}</p>
                </div>

                ${referenceWebsites ? `
                <div class="section">
                  <h3>🔗 Reference Websites</h3>
                  <p style="margin: 0; white-space: pre-wrap;">${referenceWebsites}</p>
                </div>
                ` : ''}

                ${specialRequirements ? `
                <div class="section">
                  <h3>⭐ Special Requirements</h3>
                  <p style="margin: 0; white-space: pre-wrap;">${specialRequirements}</p>
                </div>
                ` : ''}

                ${companyDescription ? `
                <div class="section">
                  <h3>🏢 Company Information</h3>
                  <p style="margin: 0 0 10px 0; white-space: pre-wrap;"><strong>About:</strong><br/>${companyDescription}</p>
                  ${targetAudience ? `<p style="margin: 0 0 10px 0; white-space: pre-wrap;"><strong>Target Audience:</strong><br/>${targetAudience}</p>` : ''}
                  ${brandGuidelines ? `<p style="margin: 0; white-space: pre-wrap;"><strong>Brand Guidelines:</strong><br/>${brandGuidelines}</p>` : ''}
                </div>
                ` : ''}

                ${uploadedFiles.length > 0 ? `
                <div class="section">
                  <h3>📎 Uploaded Files (${uploadedFiles.length})</h3>
                  ${uploadedFiles.map(file => `
                    <div style="padding: 8px; background: #f3f4f6; margin: 5px 0; border-radius: 4px;">
                      <a href="${file.url}" target="_blank" style="color: #3b82f6; text-decoration: none;">
                        📄 ${file.fileName} (${(file.fileSize / 1024).toFixed(2)} KB)
                      </a>
                    </div>
                  `).join('')}
                </div>
                ` : ''}

                <div style="text-align: center; margin-top: 20px; padding: 20px; background: #f0f9ff; border-radius: 8px;">
                  <p style="margin: 0 0 10px 0; color: #0369a1; font-weight: bold;">📞 Quick Actions</p>
                  <a href="mailto:${email}" style="display: inline-block; margin: 5px; padding: 10px 20px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px;">Email Client</a>
                  <a href="tel:${phone}" style="display: inline-block; margin: 5px; padding: 10px 20px; background: #10b981; color: white; text-decoration: none; border-radius: 6px;">Call Client</a>
                  <a href="https://wa.me/${phone.replace(/\D/g, '')}" style="display: inline-block; margin: 5px; padding: 10px 20px; background: #16a34a; color: white; text-decoration: none; border-radius: 6px;">WhatsApp</a>
                </div>
              </div>

              <div class="footer">
                <p>This booking was submitted via KamTech Solutions website</p>
                <p>Booking ID: ${booking._id}</p>
                <p>Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
              </div>
            </div>
          </body>
          </html>
        `
      }).catch(emailError => {
        console.error('Email notification error:', emailError);
        // Continue even if email fails
      });
    });

    // Send Telegram notification on booking
    setImmediate(() => {
      sendBookingTelegramNotification({
        clientName,
        email,
        phone,
        companyName,
        projectType,
        budget,
        projectTimeline,
        projectDescription
      });
    });

    // Send confirmation email to client (non-blocking - background)
    setImmediate(() => {
      const transporter = getBookingTransporter();
      console.log('🔧 Booking confirmation transporter config:', {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE,
        user: process.env.EMAIL_USER ? process.env.EMAIL_USER.replace(/(.{2}).+(@.+)/, '$1****$2') : null
      });
      sendBookingMail({
        from: `"KamTech Solutions" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '✅ We Received Your Project Booking - KamTech Solutions',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .highlight { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
              .button { display: inline-block; padding: 12px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0 0 10px 0;">✅ Booking Received!</h1>
                <p style="margin: 0; opacity: 0.9; font-size: 18px;">Thank you for choosing KamTech Solutions</p>
              </div>

              <div class="content">
                <p>Dear <strong>${clientName}</strong>,</p>

                <p>We've successfully received your project booking for <strong>${projectType}</strong> in the <strong>${projectDomain}</strong> domain.</p>

                <div class="highlight">
                  <h3 style="margin: 0 0 15px 0; color: #3b82f6;">📋 What Happens Next?</h3>
                  <ol style="margin: 0; padding-left: 20px;">
                    <li style="margin-bottom: 10px;"><strong>Review (Within 24 hours):</strong> Our team will carefully review your requirements</li>
                    <li style="margin-bottom: 10px;"><strong>Consultation Call:</strong> We'll schedule a detailed discussion to understand your vision</li>
                    <li style="margin-bottom: 10px;"><strong>Proposal & Quote:</strong> You'll receive a detailed proposal with timeline and pricing</li>
                    <li style="margin-bottom: 10px;"><strong>Project Kickoff:</strong> Once approved, we'll start building your dream project!</li>
                  </ol>
                </div>

                <div class="highlight">
                  <h3 style="margin: 0 0 10px 0; color: #3b82f6;">📞 Contact Us</h3>
                  <p style="margin: 0;">Have questions? We're here to help!</p>
                  <div style="text-align: center; margin-top: 15px;">
                    <a href="mailto:kamleshsharma@gmail.com" class="button">Email Us</a>
                    <a href="tel:+917209213003" class="button" style="background: #10b981;">Call Us</a>
                    <a href="https://wa.me/917209213003" class="button" style="background: #16a34a;">WhatsApp</a>
                  </div>
                </div>

                <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">
                  <strong>Booking Reference:</strong> ${booking._id}<br/>
                  <strong>Submitted:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                </p>

                <p style="margin-top: 20px;">
                  We're excited to work with you!<br/>
                  <strong>Team KamTech Solutions</strong>
                </p>
              </div>

              <div class="footer">
                <p>This is an automated confirmation email from KamTech Solutions</p>
                <p>© ${new Date().getFullYear()} KamTech Solutions. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `
      }).catch(emailError => {
        console.error('Client confirmation email error:', emailError);
      });
    });

    // Return success response immediately (emails send in background)
    res.status(201).json({
      success: true,
      message: 'Booking submitted successfully! We will contact you within 24 hours.',
      data: {
        id: booking._id,
        clientName: booking.clientName,
        email: booking.email,
        projectType: booking.projectType,
        status: booking.status
      }
    });

  } catch (error) {
    console.error('Booking submission error:', error);

    // If files were uploaded but booking failed, clean up Cloudinary
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        await deleteFromCloudinary(file.filename);
      }
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit booking. Please try again.'
    });
  }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Private (Admin)
exports.getAllBookings = async (req, res, next) => {
  try {
    const { status, projectType, page = 1, limit = 10 } = req.query;

    // Build query
    const query = {};
    if (status) query.status = status;
    if (projectType) query.projectType = projectType;

    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const count = await Booking.countDocuments(query);

    res.status(200).json({
      success: true,
      count: bookings.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch bookings'
    });
  }
};

// @desc    Get single booking (Admin)
// @route   GET /api/bookings/:id
// @access  Private (Admin)
exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch booking'
    });
  }
};

// @desc    Update booking status (Admin)
// @route   PUT /api/bookings/:id
// @access  Private (Admin)
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status, adminNotes, quotedPrice } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes, quotedPrice },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update booking'
    });
  }
};

// @desc    Delete booking (Admin)
// @route   DELETE /api/bookings/:id
// @access  Private (Admin)
exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Delete associated files from Cloudinary
    if (booking.uploadedFiles && booking.uploadedFiles.length > 0) {
      for (const file of booking.uploadedFiles) {
        await deleteFromCloudinary(file.publicId);
      }
    }

    await booking.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete booking'
    });
  }
};
