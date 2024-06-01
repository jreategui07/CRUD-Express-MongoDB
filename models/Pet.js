const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  type: String,
  breed: String,
  age: Number,
  ownerID: String
});

module.exports = mongoose.model('Pet', petSchema);
