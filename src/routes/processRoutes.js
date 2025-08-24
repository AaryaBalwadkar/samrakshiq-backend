// src/routes/processRoutes.js
import express from 'express';
import { upload } from '../middlewares/multer.js';
import { authenticateToken } from '../middlewares/auth.js';
import { processFile, getSession } from '../controllers/processController.js';

const router = express.Router();

// POST /process/upload → Protected route
router.post('/upload', authenticateToken, upload.single('file'), processFile);

// GET /process/:sessionId → Fetch session
router.get('/:sessionId', authenticateToken, getSession);

export default router;
