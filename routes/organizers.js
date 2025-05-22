const express = require('express');
const router = express.Router();
const connectDB = require('../database');
const Event = require('../models/Event');

connectDB();

router.get('/', (req, res) => {
  res.render('organizers');
});

router.post('/add-event', async (req, res) => {
  const { name, date, time, location, description, college, club, phone } = req.body;

  try {
    const client = await connectDB();
    const db = client.db('book-app');
    await db.collection('events').insertOne({
      name, date, time, location, description, college, club, phone
    });
    res.redirect('/events');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

module.exports = router;