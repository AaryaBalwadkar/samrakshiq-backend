// src/controllers/miscController.js
import crypto from 'crypto';

const funFacts = [
  "The first computer virus was created in 1986.",
  "The word 'algorithm' comes from the Persian mathematician Al-Khwarizmi.",
  "NASA's computers in 1969 had less processing power than today's smartphones.",
  "The first website is still online: info.cern.ch",
  "The first email was sent in 1971 by Ray Tomlinson."
];

// Get a random fun fact
export const getFunFact = (req, res) => {
  const fact = funFacts[Math.floor(Math.random() * funFacts.length)];
  res.json({ fact });
};

// Encrypt text (demo purpose only)
export const encryptText = (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  // Simple AES encryption
  const algorithm = 'aes-256-cbc';
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');

  res.json({
    encrypted,
    key: key.toString('hex'),
    iv: iv.toString('hex'),
    algorithm
  });
};
