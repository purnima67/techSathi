const express = require('express');
const router = express.Router();
const connectDB = require('../database');

router.get('/', async (req, res) => {
  try {
    const client = await connectDB();
    const db = client.db('book-app');
    const events = await db.collection('events').find().toArray();
    res.render('index', { events });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

module.exports = router;
