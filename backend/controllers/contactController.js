import nodemailer from 'nodemailer';
import validator from 'email-validator';

const createTransporter = () => {
  const email = process.env.EMAIL;
  const appPassword = process.env.APP_PASSWORD;

  if (!email || !appPassword) {
    throw new Error('Email credentials are not configured.');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: appPassword,
    },
  });
};

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
const isValidEmail = (email) => {
  return validator.validate(email);
};

/**
 * Trim whitespace from form data
 * @param {object} data
 * @returns {object}
 */
const trimFormData = (data) => {
  return {
    name: data.name?.trim() || '',
    email: data.email?.trim() || '',
    website: data.website?.trim() || '',
    message: data.message?.trim() || '',
  };
};

/**
 * Format email body
 * @param {object} data
 * @returns {string}
 */
const formatEmailBody = (data) => {
  const currentDateTime = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return `
----------------------------------
New Portfolio Contact

Name: ${data.name}

Email: ${data.email}

Website: ${data.website || 'Not provided'}

Message:
${data.message}

Date & Time: ${currentDateTime}
----------------------------------
  `;
};

/**
 * Handle contact form submission
 * @param {object} req
 * @param {object} res
 */
export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, website, message } = req.body;

    // Trim whitespace
    const formData = trimFormData({ name, email, website, message });

    // Validation: Check required fields
    if (!formData.name || !formData.email || !formData.message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.',
      });
    }

    // Validation: Check name length
    if (formData.name.length < 2 || formData.name.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Name must be between 2 and 100 characters.',
      });
    }

    // Validation: Check email format
    if (!isValidEmail(formData.email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // Validation: Check message length
    if (formData.message.length < 10 || formData.message.length > 5000) {
      return res.status(400).json({
        success: false,
        message: 'Message must be between 10 and 5000 characters.',
      });
    }

    // Validation: Check website URL if provided
    if (formData.website) {
      try {
        new URL(formData.website);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid website URL.',
        });
      }
    }

    // Format email body
    const emailBody = formatEmailBody(formData);
    const transporter = createTransporter();

    // Send email
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `New Portfolio Contact - ${formData.name}`,
      text: emailBody,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
          <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; border-left: 4px solid #000;">
            <h2 style="margin: 0; color: #000;">New Portfolio Contact</h2>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;" />
            
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Website:</strong> ${formData.website || 'Not provided'}</p>
            
            <div style="margin: 20px 0;">
              <strong>Message:</strong>
              <p style="background-color: #f9f9f9; padding: 15px; border-radius: 3px; white-space: pre-wrap;">
                ${formData.message}
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;" />
            <p style="color: #777; font-size: 12px; margin: 0;">
              <strong>Received:</strong> ${new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
              })}
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
    });
  } catch (error) {
    console.error('Contact Email Error:', error);

    // Handle specific error types
    if (error.code === 'EAUTH' || error.message === 'Email credentials are not configured.') {
      return res.status(500).json({
        success: false,
        message:
          'Email service authentication failed. Please check your Gmail credentials.',
      });
    }

    // Generic error response
    return res.status(500).json({
      success: false,
      message:
        'Failed to send message. Please try again later or contact via email directly.',
    });
  }
};
