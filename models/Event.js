const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  date: String,
  time: String,
  location: String,
  description: String,
  college: String,
  club: String,
  phone: String,
});

module.exports = mongoose.model('Event', eventSchema);