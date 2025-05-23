// const express = require('express');
// const bcrypt = require('bcryptjs');
// const User = require('../models/user.model');
// const router = express.Router();

// // Signup Page
// router.get('/signup', (req, res) => {
//   res.render('signup');
// });

// // Signup Handler
// router.post('/signup', async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ username, email, password: hashedPassword });
//     await user.save();
//     res.redirect('/login');
//   } catch (err) {
//     res.render('signup', { error: 'User already exists or invalid input.' });
//   }
// });

// // Login Page
// router.get('/login', (req, res) => {
//   res.render('login');
// });

// // Login Handler
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (user && await bcrypt.compare(password, user.password)) {
//       req.session.userId = user._id;
//       res.redirect('/');
//     } else {
//       res.render('login', { error: 'Invalid email or password.' });
//     }
//   } catch (err) {
//     res.render('login', { error: 'An error occurred.' });
//   }
// });

// // Logout
// router.get('/logout', (req, res) => {
//   req.session.destroy();
//   res.redirect('/');
// });

// module.exports = router;
const express = require('express');
const router = express.Router();

// Hardcoded demo users
const users = [
  { username: 'user1', password: 'userpass', role: 'user' },
  { username: 'admin1', password: 'adminpass', role: 'admin' }
];

// Middleware to protect routes
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

// Show login form
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Handle login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    req.session.user = { username: user.username, role: user.role };
    res.redirect('/');
  } else {
    res.render('login', { error: 'Invalid username or password' });
  }
});

// Show signup form
router.get('/signup', (req, res) => {
  res.render('signup', { error: null });
});

router.post('/signup', (req, res) => {
 
  res.redirect('/login');
});

// Protected dashboard
router.get('/dashboard', requireLogin, (req, res) => {
  res.render('dashboard', { user: req.session.user });
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;