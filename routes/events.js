const express = require('express');
const router = express.Router();
const events = require('../resources/event');

router.get('/', (req, res) => {
  res.render('events', { events });
});

module.exports = router;
