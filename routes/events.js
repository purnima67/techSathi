const express = require('express');
const router = express.Router();

// Sample events data (replace with real DB data)
// const events = [
//   { name: "Tech Meetup", date: "2025-06-01", time: "10:00 AM" },
//   { name: "Coding Workshop", date: "2025-06-05", time: "02:00 PM" },
//   { name: "AI Conference", date: "2025-06-10", time: "11:00 AM" }
// ];
const events = [
  { id: 1, name: "Tech Meetup", date: "2025-06-01", time: "10:00 AM", description: "A meetup for tech enthusiasts." },
  // more events...
];


// GET /events
 router.get('/', (req, res) => {
   res.render('events', { events }); // renders views/events.ejs
 });
router.get('/:id', (req, res) => {
  const event = events.find(e => e.id == req.params.id);
  if (!event) return res.status(404).send('Event not found');
  res.render('events', { event });
});

module.exports = router;
