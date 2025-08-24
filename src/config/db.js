// src/config/db.js
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database file path (use .env if needed)
const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../../sessions.db');

let db;

const initDB = () => {
  db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error('❌ Failed to connect to database:', err.message);
    } else {
      console.log(`📦 Connected to SQLite database at ${DB_PATH}`);
    }
  });

  // Create sessions table if not exists
  db.run(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      data TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('❌ Failed to create sessions table:', err.message);
    } else {
      console.log('✅ Sessions table ready');
    }
  });
};

// Function to get DB instance
const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized! Call initDB() first.');
  }
  return db;
};

export { initDB, getDB };
