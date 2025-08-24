// src/routes/fileRoutes.js
import express from 'express';
import { upload } from '../middlewares/multer.js';
import { uploadFile } from '../controllers/fileController.js';

const router = express.Router();

// POST /files/upload
router.post('/upload', upload.single('file'), uploadFile);

export default router;
