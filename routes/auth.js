const express = require('express');
const router = express.Router();
const connectDB = require('../database');

router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.get('/signup', (req, res) => {
  res.render('signup', { error: null });
});

router.post('/signup', async (req, res) => {
  if (!req.body) {
    return res.status(400).render('signup', { error: 'No form data received' });
  }
  const { username, password } = req.body;
  try {
    const client = await connectDB();
    const db = client.db('book-app');
    const existingUser = await db.collection('users').findOne({ username });
    if (existingUser) {
      return res.render('signup', { error: 'Username already exists' });
    }
  
    await db.collection('users').insertOne({ username, password });
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    res.render('signup', { error: 'Database error' });
  } finally {
    client.close();
  }
});

router.post('/login', async (req, res) => {
  if (!req.body) {
    return res.status(400).render('login', { error: 'No form data received' });
  }
  const { username, password } = req.body;
  try {
    const client = await connectDB();
    const db = client.db('book-app');
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return res.render('login', { error: 'Invalid username or password' });
    }
    
    if (user.password !== password) {
      return res.render('login', { error: 'Invalid username or password' });
    }
   
    if (username === 'admin' && password === 'admin123') {
      res.redirect('/admin');
    } else if (username === 'user' && password === 'user123') {
      res.redirect('/');
    } else {
      res.render('login', { error: 'Invalid credentials for demo' });
    }
  } catch (err) {
    console.error(err);
    res.render('login', { error: 'Database error' });
  } finally {
    client.close();
  }
});

module.exports = router;