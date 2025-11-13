const pool = require('./db.js');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('DB error:', err);
  } else {
    console.log('DB connected:', res.rows[0]);
  }
  pool.end(); // close connection
});
