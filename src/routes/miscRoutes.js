// src/routes/miscRoutes.js
import express from 'express';
import { getFunFact, encryptText } from '../controllers/miscController.js';

const router = express.Router();

router.get('/fun-fact', getFunFact);
router.post('/encrypt', encryptText);

export default router;
