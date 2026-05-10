require('dotenv').config();
const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: config.GOOGLE_USER,
        clientId: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        refreshToken: config.GOOGLE_REFRESH_TOKEN,
    },
});

// Verify the connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});


// Function to send email
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Your Name" <${config.GOOGLE_USER}>`, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

async function sendRegistrationEmail(userEmail, username) {
    const subject = 'Welcome to Our Bank!';
    const text = `Hi ${username},\n\nThank you for registering with our bank. We're excited to have you on board!\n\nBest regards,\nYour Bank Team`;
    const html = `<p>Hi ${username},</p><p>Thank you for registering with our bank. We're excited to have you on board!</p><p>Best regards,<br>Your Bank Team</p>`;
    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, username, amount, transactionType) {
    const subject = `Your ${transactionType} Transaction of $${amount}`;
    const text = `Hi ${username},\n\nYour ${transactionType} transaction of $${amount} has been processed successfully.\n\nBest regards,\nYour Bank Team`;
    const html = `<p>Hi ${username},</p><p>Your ${transactionType} transaction of $${amount} has been processed successfully.</p><p>Best regards,<br>Your Bank Team</p>`;
    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, username, amount, transactionType) {
    const subject = `Your ${transactionType} Transaction of $${amount} Failed`;
    const text = `Hi ${username},\n\nWe regret to inform you that your ${transactionType} transaction of $${amount} has failed. Please try again later or contact support for assistance.\n\nBest regards,\nYour Bank Team`;
    const html = `<p>Hi ${username},</p><p>We regret to inform you that your ${transactionType} transaction of $${amount} has failed. Please try again later or contact support for assistance.</p><p>Best regards,<br>Your Bank Team</p>`;
    await sendEmail(userEmail, subject, text, html);
}

module.exports = { sendEmail, sendRegistrationEmail, sendTransactionEmail, sendTransactionFailureEmail };