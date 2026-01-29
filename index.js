require('dotenv').config();
const bodyParser = require('body-parser'); 
const nodemailer = require('nodemailer');
const Subscription = require('./models/subscription.model.js');
const { validateEmail, replaceHTML } = require('./utils');
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const pool = require('./db.js');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static('public/img'));


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); 
}); 

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
}); 

app.get('/photos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'photos.html'));
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query({
      text: 'SELECT NOW()',
      rowMode: 'array',
      statement_timeout: 5000
    });
    console.log('DB test success: ', result.rows[0][0]);
    res.json({ time: result.rows[0][0] });
  } catch (err) {
    console.error('Database connection errors:',err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

/* function for the subscribe endpoint */
app.post('/subscribe', async (req, res) => {
  console.log('Request body:', req.body);
  const email = req.body.email?.trim().toLowerCase();

  if (!email || !validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  try {
    const existing = await Subscription.findByEmail(email);
    console.log('existing subscriber:', existing);

    if (existing && existing.confirmed) {
      return res.status(200).json({ message: 'Already subscribed' });
    }

    const subscriber = await Subscription.create(email);
    console.log('subscriber created:', subscriber);
    // Prepare confirmation email
    const htmlTemplate = `
      <p>Hi {{email}},</p>
      <p>Click the link below to confirm your newsletter subscription:</p>
      <a href="{{confirmLink}}">{{confirmLink}}</a>
      <p>If you did not subscribe, ignore this email or <a href="{{unsubscribeLink}}">unsubscribe</a>.</p>
    `;

    const html = replaceHTML(htmlTemplate, {
      email: subscriber.email,
      confirmLink: `http://localhost:${PORT}/confirm/${subscriber.token}`,
      unsubscribeLink: `http://localhost:${PORT}/unsubscribe/${subscriber.token}`
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: subscriber.email,
      subject: 'Confirm your newsletter subscription',
      html
    });

    res.status(200).json({ message: 'Confirmation email sent! Check your inbox.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Confirm subscription
app.get('/confirm/:token', async (req, res) => {
  const subscriber = await Subscription.confirm(req.params.token);
  if (!subscriber) return res.status(400).send('Invalid or expired token.');
  res.send('Subscription confirmed! Thank you.');
});

/* function for the unsubscribe endpoint */
app.get('/unsubscribe/:token', async (req, res) => {
  const subscriber = await Subscription.unsubscribe(req.params.token);
  if (!subscriber) return res.status(400).send('Invalid or expired token.');
  res.send('You have been unsubscribed.');
});

// fucntion for photos page
app.get('/api/photos', (req,res) => {
  const page = parseInt(req.query.page || 0);
  const limit = 15;

  const folder = path.join(__dirname, 'public', 'img\Bailey Photos');

  const files = fs.readdirSync(folder)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort(); // optional but recommended

  const start = page * limit;
  const end = start + limit;

  const photos = files.slice(start, end).map(file => ({
    src: `/img/Bailey Photos/${encodeURIComponent(file)}`
  }));

  res.json({
    photos,
    total: files.length,
    page
  })
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
