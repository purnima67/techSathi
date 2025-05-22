const express = require('express');
const router = express.Router();

// Sample events data (replace this with your real data or DB fetch)
const events = [
  { name: "Tech Meetup", date: "2025-06-01", time: "10:00 AM" },
  { name: "Coding Workshop", date: "2025-06-05", time: "02:00 PM" },
  { name: "AI Conference", date: "2025-06-10", time: "11:00 AM" }
];

router.get('/', (req, res) => {
  res.render('index', { events }); // Pass events to index.ejs
});

module.exports = router;
