const mongoose = require('mongoose');

const dogWalkerSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  available: Boolean
});

module.exports = mongoose.model('DogWalker', dogWalkerSchema);
