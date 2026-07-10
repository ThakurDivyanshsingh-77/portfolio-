import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import contactRoutes from './routes/contact.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Normalize frontend URL for CORS
const rawFrontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
const FRONTEND_URL = rawFrontendUrl.replace(/\/+$/, '');

// CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin === FRONTEND_URL) {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
  console.log(`📧 Frontend URL: ${FRONTEND_URL}`);
  console.log(`🔐 Email: ${process.env.EMAIL || 'Not configured'}`);
});
