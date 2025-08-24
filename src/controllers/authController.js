// src/controllers/authController.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// ⚡ Mock user database (replace with real DB later)
const users = {
  user: 'pass', // username: password
};

export const login = (req, res) => {
  const { username, password } = req.body;

  if (users[username] && users[username] === password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};
