const express = require('express');
const router = express.Router();
const connectDB = require('../database');
const { ObjectId } = require('mongodb');

// Middleware to simulate admin access
const isAdmin = (req, res, next) => {
  next(); // Replace with real authentication later
};

// Admin dashboard: list events
router.get('/', isAdmin, async (req, res) => {
  try {
    const client = await connectDB();
    const db = client.db('book-app');
    const events = await db.collection('events').find().toArray();
    res.render('admin', { events });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// Render add event form
router.get('/add-events', isAdmin, (req, res) => {
  res.render('add-events', { event: null });
});

// Add new event
router.post('/add-events', isAdmin, async (req, res) => {
  const { name, date, time, college, club } = req.body;
  try {
    const client = await connectDB();
    const db = client.db('book-app');
    await db.collection('events').insertOne({ name, date, time, college, club });
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// Render edit form
router.get('/edit-event/:id', isAdmin, async (req, res) => {
  try {
    const client = await connectDB();
    const db = client.db('book-app');
    // req.params.id is used here
    const event = await db.collection('events').findOne({ _id: new ObjectId(req.params.id) });
    if (event) {
      res.render('add-events', { event });
    } else {
      res.status(404).send('Event not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// Update event
router.post('/edit-event/:id', isAdmin, async (req, res) => {
  const { name, date, time, college, club } = req.body;
  try {
    const client = await connectDB();
    const db = client.db('book-app');
    await db.collection('events').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { name, date, time, college, club } }
    );
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// Delete event
router.get('/delete-event/:id', isAdmin, async (req, res) => {
  try {
    const client = await connectDB();
    const db = client.db('book-app');
    // req.params.id is used here
      await db.collection('events').deleteOne({ _id: new ObjectId(req.params.id) });

    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

router.post('/delete-event', isAdmin, async (req, res) => {
  const { id } = req.body;
  try {
    const client = await connectDB();
    const db = client.db('book-app');
    await db.collection('events').deleteOne({ _id: new ObjectId(id) });
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

module.exports = router;