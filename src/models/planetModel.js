const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planetModel = new Schema({
  id: {
    type: Number
  },
  name: { type: String }
});

module.exports = mongoose.model('Planet', planetModel);
