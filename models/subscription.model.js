import crypto from 'crypto';
import pool from '../db';

dotenv.config();


// Helper to generate tokens
const generateToken = () => crypto.randomBytes(32).toString('hex');

// Subscription model
class Subscription {
  constructor({ id, email, confirmed, token, subscribed_at }) {
    this.id = id;
    this.email = email;
    this.confirmed = confirmed;
    this.token = token;
    this.subscribed_at = subscribed_at;
  }

  // Create a new subscriber
  static async create(email) {
    const token = generateToken();

    const result = await pool.query(
      `
      INSERT INTO subscribers(email, token)
      VALUES ($1, $2)
      ON CONFLICT (email) DO UPDATE SET token = EXCLUDED.token
      RETURNING *
      `,
      [email, token]
    );

    return new Subscription(result.rows[0]);
  }

  // Find subscriber by email
  static async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM subscribers WHERE email = $1',
      [email]
    );
    if (!result.rows.length) return null;
    return new Subscription(result.rows[0]);
  }

  // Find subscriber by token
  static async findByToken(token) {
    const result = await pool.query(
      'SELECT * FROM subscribers WHERE token = $1',
      [token]
    );
    if (!result.rows.length) return null;
    return new Subscription(result.rows[0]);
  }

  // Confirm subscription
  static async confirm(token) {
    const result = await pool.query(
      'UPDATE subscribers SET confirmed = TRUE WHERE token = $1 RETURNING *',
      [token]
    );
    if (!result.rows.length) return null;
    return new Subscription(result.rows[0]);
  }

  // Unsubscribe by token
  static async unsubscribe(token) {
    const result = await pool.query(
      'DELETE FROM subscribers WHERE token = $1 RETURNING *',
      [token]
    );
    if (!result.rows.length) return null;
    return new Subscription(result.rows[0]);
  }

  // List all confirmed subscribers
  static async allConfirmed() {
    const result = await pool.query(
      'SELECT * FROM subscribers WHERE confirmed = TRUE'
    );
    return result.rows.map(row => new Subscription(row));
  }
}

module.exports = Subscription;
