// src/controllers/processController.js
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
import { createSession, getSessionById } from '../models/sessionModel.js';

// Process uploaded file by sending it to anonymizer service
export const processFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = path.join(process.cwd(), 'uploads', req.file.filename);

    // Prepare form-data
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    // Send to external anonymizer service (adjust URL as needed)
    const response = await axios.post('http://localhost:8000/anonymize', formData, {
      headers: formData.getHeaders(),
    });

    // Create session entry
    const sessionId = Date.now().toString();
    await createSession(sessionId, {
      filename: req.file.filename,
      status: 'processed',
      result: response.data,
    });

    res.json({ sessionId, status: 'processing' });
  } catch (error) {
    console.error('❌ Processing failed:', error.message);
    res.status(500).json({ error: 'Processing failed' });
  }
};

// Get processed session by ID
export const getSession = async (req, res) => {
  try {
    const session = await getSessionById(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json({ session });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch session' });
  }
};
