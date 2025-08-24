// src/models/sessionModel.js
import { getDB } from '../config/db.js';

// Create a new session
const createSession = (id, data) => {
  return new Promise((resolve, reject) => {
    const db = getDB();
    db.run(
      'INSERT INTO sessions (id, data) VALUES (?, ?)',
      [id, JSON.stringify(data)],
      function (err) {
        if (err) reject(err);
        else resolve({ id, data });
      }
    );
  });
};

// Fetch a session by ID
const getSessionById = (id) => {
  return new Promise((resolve, reject) => {
    const db = getDB();
    db.get('SELECT * FROM sessions WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// Fetch all sessions (optional utility)
const getAllSessions = () => {
  return new Promise((resolve, reject) => {
    const db = getDB();
    db.all('SELECT * FROM sessions ORDER BY created_at DESC', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Delete a session by ID
const deleteSession = (id) => {
  return new Promise((resolve, reject) => {
    const db = getDB();
    db.run('DELETE FROM sessions WHERE id = ?', [id], function (err) {
      if (err) reject(err);
      else resolve(this.changes > 0); // true if deleted
    });
  });
};

export {
  createSession,
  getSessionById,
  getAllSessions,
  deleteSession,
};
