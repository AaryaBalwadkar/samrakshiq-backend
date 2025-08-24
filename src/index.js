// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// DB connection (SQLite here, but later can add Mongo/Postgres)
import { initDB } from './config/db.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import processRoutes from './routes/processRoutes.js';
import miscRoutes from './routes/miscRoutes.js';
const app = express();

// -------------------- Middlewares --------------------
app.use(express.json()); // parse JSON bodies
app.use(cors()); // enable CORS
app.use(morgan('dev')); // log requests in console

// Serve uploaded files statically if needed
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// -------------------- Routes --------------------
app.use('/auth', authRoutes);
app.use('/files', fileRoutes);
app.use('/process', processRoutes);
app.use('/', miscRoutes); // fun-fact etc.

// -------------------- DB Init --------------------
initDB();

// -------------------- Start Server --------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
