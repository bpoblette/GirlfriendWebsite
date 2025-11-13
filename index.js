require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const pool = require('./db.js');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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
    const result = await pool.query({});
  } catch (err) {
    
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
