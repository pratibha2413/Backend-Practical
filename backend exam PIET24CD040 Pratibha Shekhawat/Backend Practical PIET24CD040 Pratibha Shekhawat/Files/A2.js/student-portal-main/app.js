// app.js — Express application setup (security + routes)
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

const app = express();

// ─── 1. Security middleware ────────────────────────────────────────────────

// helmet: sets security-related HTTP headers
app.use(helmet());

// cors: allow cross-origin requests (configure origin in production)
app.use(cors());

// express-rate-limit: 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,  // Return rate-limit info in `RateLimit-*` headers
  legacyHeaders: false,   // Disable `X-RateLimit-*` headers
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.',
  },
});
app.use(limiter);

// ─── 2. Body parsing ──────────────────────────────────────────────────────

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── 3. Health check ──────────────────────────────────────────────────────

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Student Portal API is running 🎓',
    endpoints: {
      register: 'POST /register',
      login: 'POST /login',
      profile: 'GET  /profile  (Bearer token required)',
      students: 'GET  /students (admin token required)',
    },
  });
});

// ─── 4. Routes ────────────────────────────────────────────────────────────

app.use('/', authRoutes);
app.use('/', protectedRoutes);

// ─── 5. 404 handler ───────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found.` });
});

// ─── 6. Global error handler ─────────────────────────────────────────────

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

module.exports = app;
