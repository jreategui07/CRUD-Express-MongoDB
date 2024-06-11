const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  petID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
  },
  walkerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DogWalker",
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
