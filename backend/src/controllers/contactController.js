const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Safe fetch wrapper: use global fetch (Node18+) or fall back to node-fetch if installed
const safeFetch = (...args) => {
  if (typeof fetch !== 'undefined') return fetch(...args);
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nodeFetch = require('node-fetch');
    return nodeFetch(...args);
  } catch (err) {
    console.error('Fetch is not available and node-fetch is not installed. Telegram notifications will not be sent.', err);
    throw err;
  }
};

// Email configuration
const getEmailTransporter = () => {
  const port = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 587;
  const secure = process.env.EMAIL_SECURE === 'true' || port === 465;

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port,
    secure,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    // Short timeouts so failures don't block the request for too long
    connectionTimeout: process.env.EMAIL_CONNECTION_TIMEOUT ? parseInt(process.env.EMAIL_CONNECTION_TIMEOUT, 10) : 10000,
    greetingTimeout: process.env.EMAIL_GREETING_TIMEOUT ? parseInt(process.env.EMAIL_GREETING_TIMEOUT, 10) : 10000,
    socketTimeout: process.env.EMAIL_SOCKET_TIMEOUT ? parseInt(process.env.EMAIL_SOCKET_TIMEOUT, 10) : 20000
  });
};

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res, next) => {
  try {
    console.log('📨 Contact form submission received');
    console.log('📋 Request body:', req.body);

    const { name, email, phone, subject, message, projectBudget, projectType, urgency } = req.body;

    // Get IP and User Agent
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // Create contact entry
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      projectBudget,
      projectType,
      urgency,
      ipAddress,
      userAgent
    });

    // Asynchronous email task
    (async () => {
      try {
        const transporter = getEmailTransporter();

        const mailOptions = {
          from: process.env.EMAIL_FROM,
          to: process.env.CONTACT_EMAIL,
          subject: `New Contact Form Submission: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #3B82F6;">New Contact Form Submission</h2>

              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #333;">Contact Details</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                <p><strong>Subject:</strong> ${subject}</p>
              </div>

              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #333;">Project Information</h3>
                ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
                ${projectBudget ? `<p><strong>Budget:</strong> ${projectBudget}</p>` : ''}
                ${urgency ? `<p><strong>Urgency:</strong> ${urgency}</p>` : ''}
              </div>

              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #333;">Message</h3>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>

              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                <p>Submitted at: ${new Date().toLocaleString()}</p>
                <p>IP Address: ${ipAddress}</p>
              </div>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);

        const userMailOptions = {
          from: process.env.EMAIL_FROM,
          to: email,
          subject: 'Thank you for contacting Kamlesh Sharma',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #3B82F6;">Thank You for Reaching Out!</h2>

              <p>Hi ${name},</p>

              <p>Thank you for contacting me. I've received your message and will get back to you as soon as possible, typically within 24-48 hours.</p>

              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Your Message Summary</h3>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>

              <p>In the meantime, feel free to:</p>
              <ul>
                <li>Check out my portfolio: <a href="https://achhadam.com">https://achhadam.com</a></li>
                <li>Connect on LinkedIn: <a href="https://www.linkedin.com/in/kamlesh-sharmathink">Kamlesh Sharma</a></li>
                <li>View my GitHub: <a href="https://github.com/kamleshthink">@kamleshthink</a></li>
              </ul>

              <p>Best regards,<br><strong>Kamlesh Sharma</strong><br>Full Stack Developer | MERN Stack Specialist</p>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                <p>This is an automated confirmation email. Please do not reply to this email.</p>
              </div>
            </div>
          `
        };

        await transporter.sendMail(userMailOptions);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
    })();

    // Asynchronous Telegram task
    (async () => {
      try {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        if (!token || !chatId) return;

        const messageText = `New contact from ${name} (${email})\nSubject: ${subject}\nPhone: ${phone || 'N/A'}\nProject: ${projectType || 'N/A'}\nBudget: ${projectBudget || 'N/A'}\n\nMessage:\n${message}`;

        await safeFetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: messageText })
        });
      } catch (err) {
        console.error('Telegram notification failed:', err);
      }
    })();

    // Respond immediately
    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email
      }
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get all contacts (Admin)
// @route   GET /api/contact
// @access  Private
exports.getAllContacts = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    let query = {};
    if (status) {
      query.status = status;
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: contacts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private
exports.updateContactStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
