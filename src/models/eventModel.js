const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventModel = new Schema({
  id: {
    type: Number
  },
  date: { type: String },
  planet: { type: String },
  type: { type: String },
  sign: { type: String },
  degree: {
    type: String,
    default: "false"
  }
});

module.exports = mongoose.model('Event', eventModel);
