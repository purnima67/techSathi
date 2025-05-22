const express = require('express');
const router = express.Router();
const events = require('../resources/event');

router.get('/', (req, res) => {
  res.render('organizers');
});

router.post('/add-event', (req, res) => {
  const { name, date, time, location, description, college, club } = req.body;

  // Add the new event to the array
  events.push({ name, date, time, location, description, college, club });

  // Redirect to events page
  res.redirect('/events');
});

module.exports = router;
