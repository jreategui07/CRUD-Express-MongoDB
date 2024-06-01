const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: String,
  contact: String
});

module.exports = mongoose.model('Client', clientSchema);
