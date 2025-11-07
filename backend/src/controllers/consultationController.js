const Consultation = require('../models/Consultation');
const nodemailer = require('nodemailer');

// Email configuration
const getEmailTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// @desc    Submit consultation booking
// @route   POST /api/consultations
// @access  Public
exports.submitConsultation = async (req, res, next) => {
  try {
    console.log('📅 Consultation booking received');
    console.log('📋 Request body:', req.body);

    const { name, email, phone, preferredDate, preferredTime, mode, projectType, message } = req.body;

    // Get IP and User Agent
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // Create consultation entry
    const consultation = await Consultation.create({
      name,
      email,
      phone,
      preferredDate,
      preferredTime,
      mode,
      projectType: projectType || '',
      message: message || '',
      ipAddress,
      userAgent
    });

    // Format date for emails
    const formattedDate = new Date(preferredDate).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Kolkata'
    });

    // Send email notification to admin
    try {
      const transporter = getEmailTransporter();
      await transporter.sendMail({
        from: `"KamTech Solutions" <${process.env.EMAIL_USER}>`,
        to: process.env.CONTACT_EMAIL || 'kamleshsharma@gmail.com',
        subject: `📅 New Free Consultation Request - ${name}`,
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
              .badge { display: inline-block; padding: 6px 16px; background: #dbeafe; color: #1e40af; border-radius: 12px; font-size: 14px; font-weight: 600; }
              .value-badge { display: inline-block; padding: 8px 20px; background: #dcfce7; color: #166534; border-radius: 12px; font-size: 16px; font-weight: 700; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
              .highlight { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; text-align: center; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">📅 New Free Consultation Request!</h2>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">Worth ₹5,000 - Schedule within 2-3 hours</p>
              </div>

              <div class="content">
                <div class="highlight">
                  <h3 style="margin: 0 0 10px 0; color: #92400e;">⏰ Action Required: Respond within 2-3 hours</h3>
                  <p style="margin: 0; color: #78350f;">Contact the client to confirm the consultation schedule</p>
                </div>

                <!-- Client Information -->
                <div class="section">
                  <h3>👤 Client Information</h3>
                  <div class="info-row">
                    <div class="info-label">Name:</div>
                    <div class="info-value"><strong>${name}</strong></div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Email:</div>
                    <div class="info-value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Phone:</div>
                    <div class="info-value"><a href="tel:${phone}">${phone}</a></div>
                  </div>
                </div>

                <!-- Consultation Details -->
                <div class="section">
                  <h3>📋 Consultation Details</h3>
                  <div class="info-row">
                    <div class="info-label">Mode:</div>
                    <div class="info-value">
                      <span class="badge">${mode === 'google-meet' ? '🎥 Google Meet' : '📞 Phone Call'}</span>
                    </div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Preferred Date:</div>
                    <div class="info-value"><strong>${formattedDate}</strong></div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Preferred Time:</div>
                    <div class="info-value"><strong>${preferredTime}</strong></div>
                  </div>
                  ${projectType ? `
                  <div class="info-row">
                    <div class="info-label">Project Type:</div>
                    <div class="info-value">${projectType}</div>
                  </div>
                  ` : ''}
                </div>

                ${message ? `
                <div class="section">
                  <h3>💬 Message</h3>
                  <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
                ` : ''}

                <div class="highlight" style="background: #dcfce7;">
                  <p style="margin: 0 0 10px 0; color: #166534; font-weight: bold;">💎 Consultation Value</p>
                  <span class="value-badge">₹5,000 FREE</span>
                </div>

                <div style="text-align: center; margin-top: 20px; padding: 20px; background: #f0f9ff; border-radius: 8px;">
                  <p style="margin: 0 0 10px 0; color: #0369a1; font-weight: bold;">📞 Quick Actions</p>
                  <a href="mailto:${email}" style="display: inline-block; margin: 5px; padding: 10px 20px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px;">Email Client</a>
                  <a href="tel:${phone}" style="display: inline-block; margin: 5px; padding: 10px 20px; background: #10b981; color: white; text-decoration: none; border-radius: 6px;">Call Client</a>
                  <a href="https://wa.me/${phone.replace(/\D/g, '')}" style="display: inline-block; margin: 5px; padding: 10px 20px; background: #16a34a; color: white; text-decoration: none; border-radius: 6px;">WhatsApp</a>
                </div>
              </div>

              <div class="footer">
                <p>Consultation ID: ${consultation._id}</p>
                <p>Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
              </div>
            </div>
          </body>
          </html>
        `
      });
    } catch (emailError) {
      console.error('Admin email notification error:', emailError);
    }

    // Send confirmation email to client
    try {
      const transporter = getEmailTransporter();
      await transporter.sendMail({
        from: `"KamTech Solutions" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '✅ Free Consultation Confirmed - KamTech Solutions',
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
              .value-box { background: #dcfce7; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
              .button { display: inline-block; padding: 12px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0 0 10px 0;">✅ Consultation Request Received!</h1>
                <p style="margin: 0; opacity: 0.9; font-size: 18px;">We'll contact you within 2-3 hours</p>
              </div>

              <div class="content">
                <p>Dear <strong>${name}</strong>,</p>

                <p>Thank you for scheduling a free consultation with KamTech Solutions! We've received your request and will contact you shortly to confirm the details.</p>

                <div class="value-box">
                  <p style="margin: 0 0 10px 0; color: #166534; font-weight: bold; font-size: 16px;">💎 Your Consultation Value</p>
                  <p style="margin: 0; color: #166534; font-size: 28px; font-weight: 700;">₹5,000 FREE</p>
                </div>

                <div class="highlight">
                  <h3 style="margin: 0 0 15px 0; color: #3b82f6;">📋 Your Consultation Details</h3>
                  <p style="margin: 5px 0;"><strong>Mode:</strong> ${mode === 'google-meet' ? '🎥 Google Meet (Video Call)' : '📞 Phone Call'}</p>
                  <p style="margin: 5px 0;"><strong>Preferred Date:</strong> ${formattedDate}</p>
                  <p style="margin: 5px 0;"><strong>Preferred Time:</strong> ${preferredTime}</p>
                  ${projectType ? `<p style="margin: 5px 0;"><strong>Project Type:</strong> ${projectType}</p>` : ''}
                </div>

                <div class="highlight">
                  <h3 style="margin: 0 0 15px 0; color: #3b82f6;">📞 What Happens Next?</h3>
                  <ol style="margin: 0; padding-left: 20px;">
                    <li style="margin-bottom: 10px;"><strong>Confirmation Call (Within 2-3 hours):</strong> We'll call to confirm the schedule</li>
                    <li style="margin-bottom: 10px;"><strong>${mode === 'google-meet' ? 'Meeting Link' : 'Final Confirmation'}:</strong> ${mode === 'google-meet' ? 'You\'ll receive a Google Meet link via email' : 'We\'ll confirm the phone number for the call'}</li>
                    <li style="margin-bottom: 10px;"><strong>Consultation Day:</strong> Join us at the scheduled time to discuss your project</li>
                    <li style="margin-bottom: 10px;"><strong>After Consultation:</strong> Receive a detailed proposal and next steps</li>
                  </ol>
                </div>

                <div class="highlight">
                  <h3 style="margin: 0 0 10px 0; color: #3b82f6;">📞 Need to Reschedule or Have Questions?</h3>
                  <p style="margin: 0 0 15px 0;">Contact us anytime:</p>
                  <div style="text-align: center;">
                    <a href="mailto:kamleshsharma@gmail.com" class="button">Email Us</a>
                    <a href="tel:+917209213003" class="button" style="background: #10b981;">Call Us</a>
                    <a href="https://wa.me/917209213003" class="button" style="background: #16a34a;">WhatsApp</a>
                  </div>
                </div>

                <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">
                  <strong>Consultation ID:</strong> ${consultation._id}<br/>
                  <strong>Submitted:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                </p>

                <p style="margin-top: 20px;">
                  We're excited to discuss your project!<br/>
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
      });
    } catch (emailError) {
      console.error('Client confirmation email error:', emailError);
    }

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Consultation booked successfully! We\'ll contact you within 2-3 hours to confirm the schedule.',
      data: {
        id: consultation._id,
        name: consultation.name,
        email: consultation.email,
        preferredDate: consultation.preferredDate,
        preferredTime: consultation.preferredTime,
        mode: consultation.mode,
        status: consultation.status
      }
    });

  } catch (error) {
    console.error('Consultation submission error:', error);

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit consultation booking. Please try again.'
    });
  }
};

// @desc    Get all consultations (Admin)
// @route   GET /api/consultations
// @access  Private (Admin)
exports.getAllConsultations = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    // Build query
    const query = {};
    if (status) query.status = status;

    const consultations = await Consultation.find(query)
      .sort({ preferredDate: 1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const count = await Consultation.countDocuments(query);

    res.status(200).json({
      success: true,
      count: consultations.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      data: consultations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch consultations'
    });
  }
};

// @desc    Get single consultation (Admin)
// @route   GET /api/consultations/:id
// @access  Private (Admin)
exports.getConsultationById = async (req, res, next) => {
  try {
    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: consultation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch consultation'
    });
  }
};

// @desc    Update consultation (Admin)
// @route   PUT /api/consultations/:id
// @access  Private (Admin)
exports.updateConsultation = async (req, res, next) => {
  try {
    const { status, meetingLink, adminNotes } = req.body;

    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      { status, meetingLink, adminNotes },
      { new: true, runValidators: true }
    );

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Consultation updated successfully',
      data: consultation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update consultation'
    });
  }
};

// @desc    Delete consultation (Admin)
// @route   DELETE /api/consultations/:id
// @access  Private (Admin)
exports.deleteConsultation = async (req, res, next) => {
  try {
    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    await consultation.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Consultation deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete consultation'
    });
  }
};
