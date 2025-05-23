const express = require('express');
const router = express.Router();
const connectDB = require('../database');

// router.get('/', async (req, res) => {

//   try {
    
//     const client = await connectDB();
//     const db = client.db('book-app');
   
//     const events = await db.collection('events').find( { $or: [ { "name": { $eq: req.params?.query?.name }, "club": { $eq: req.params?.query?.name } } ] }).toArray();

//     // const events = await db.collection('events').find().toArray();
//     res.render('index', { events });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Database error');
//   }
// });

// module.exports = router;
router.get('/', async (req, res) => {
  try {
    const client = await connectDB();
    const db = client.db('book-app');

    const events = await db.collection('events')
      .find({})
      .sort({ _id: -1 }) 
      .limit(3)          
      .toArray();

    res.render('index', { events });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});


module.exports = router;