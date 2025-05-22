
const express = require('express');
const router = express.Router();

const events = []; 


router.get('/', (req, res) => {
  res.render('organizers');
});


router.post('/add-event', (req, res) => {
  const { name, date, time, location, description } = req.body;
  events.push({ name, date, time, location, description });
  res.redirect('/'); 
});

module.exports = router;
