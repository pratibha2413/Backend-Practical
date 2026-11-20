// routes/protected.js — /profile and /students
const express = require('express');
const db = require('../db');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// ─── GET /profile ──────────────────────────────────────────────────────────

/**
 * @route   GET /profile
 * @desc    Returns the logged-in user's details (no password)
 * @access  Private (any authenticated user)
 */
router.get('/profile', authMiddleware, (req, res) => {
  const user = db.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  // Destructure to strip the password field
  const { password, ...safeUser } = user;

  return res.status(200).json({
    success: true,
    data: safeUser,
  });
});

// ─── GET /students ─────────────────────────────────────────────────────────

/**
 * @route   GET /students
 * @desc    Returns all registered users (admin only)
 * @access  Private (admin role only)
 */
router.get('/students', authMiddleware, roleMiddleware('admin'), (req, res) => {
  const allUsers = db.findAll(); // passwords already stripped inside db.findAll()

  return res.status(200).json({
    success: true,
    count: allUsers.length,
    data: allUsers,
  });
});

module.exports = router;
