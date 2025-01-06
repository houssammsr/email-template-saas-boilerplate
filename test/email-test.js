require('dotenv').config({ path: '.env.local' });
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

// Your domain and email configuration
const EMAIL_CONFIG = {
  subdomain: "mg", // Your Mailgun subdomain
  domainName: "pryzenya.com", // Replace with your actual domain
  fromAdmin: "Support <support@mg.pryzenya.com>", // Replace with your actual email
};

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "dummy",
});

async function testEmail() {
  try {
    console.log('Starting email test...');
    console.log('Checking configuration...');
    
    // Debug: Print configuration (hiding sensitive parts)
    console.log('Configuration:', {
      apiKey: process.env.MAILGUN_API_KEY ? '****' + process.env.MAILGUN_API_KEY.slice(-4) : 'missing',
      domain: `${EMAIL_CONFIG.subdomain}.${EMAIL_CONFIG.domainName}`,
      from: EMAIL_CONFIG.fromAdmin
    });

    if (!process.env.MAILGUN_API_KEY) {
      throw new Error('MAILGUN_API_KEY is missing from .env.local');
    }

    console.log('Attempting to send test email...');

    const data = {
      from: EMAIL_CONFIG.fromAdmin,
      to: ['tover7563@gmail.com'], // Replace with your actual email
      subject: 'Test Email',
      text: 'This is a test email.',
      html: '<h1>Test Email</h1><p>This is a test email.</p>'
    };

    const domain = (EMAIL_CONFIG.subdomain ? `${EMAIL_CONFIG.subdomain}.` : "") + EMAIL_CONFIG.domainName;
    console.log('Sending to domain:', domain);

    const result = await mg.messages.create(domain, data);
    console.log('API Response:', result);

    console.log('✅ Email sent successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Details:', error.details || 'No additional details');
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
  }
}

testEmail();