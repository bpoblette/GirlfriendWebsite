require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const Subscription = require('../models/subscription.model');
const { getRandomImage, replaceHTML } = require('../utils');

// Nodemailer transporter for Gmail
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,       // SSL
  secure: true,    // true for 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // app password
  },
});

// Main function to send the weekly newsletter
async function sendWeeklyNewsletter() {
  try {
    const subscribers = await Subscription.allConfirmed();

    if (!subscribers.length) {
      return console.log('No confirmed subscribers yet.');
    }

    // Load HTML template
    const htmlTemplate = await fs.readFile(
      path.join(__dirname, '../templates/mail.html'),
      'utf-8'
    );

    // Pick a random image from the folder
    const randomImagePath = getRandomImage(
      path.join(__dirname, '../public/img/Bailey Photos')
    );
    const imageUrl = `http://localhost:3000/img/Bailey Photos/${path.basename(randomImagePath)}`;

    // Replace placeholders in template
    const htmlContent = replaceHTML(htmlTemplate, {
      content: 'Hello! This is your weekly newsletter 👋',
      imageUrl,
    });

    // Send emails
    for (const sub of subscribers) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: sub.email,
        subject: 'Weekly Newsletter',
        html: htmlContent,
      });
      console.log(`Email sent to ${sub.email} at ${new Date().toISOString()}`);
    }
  } catch (err) {
    console.error('Weekly newsletter error:', err);
  }
}

// Schedule: Every Monday at 9am
schedule.scheduleJob('0 9 * * 1', sendWeeklyNewsletter);

// Optional: run immediately for testing
sendWeeklyNewsletter();
