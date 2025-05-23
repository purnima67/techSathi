const express = require('express');
const router = express.Router();

// GET Help page
router.get('/', (req, res) => {
  res.render('help', { status: null });
});

// POST Help form - just redirect to thank you page without DB
router.post('/status', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    // Redirect with error status and message
    return res.redirect('/status?status=error&errorMessage=All+fields+are+required.');
  }

  // On success, redirect to thank-you status page
  res.redirect('/status?status=success');
});

module.exports = router;