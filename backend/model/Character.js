const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: String,
  race: {
    id: String,
    name: String
  },
  class: {
    id: String,
    name: String
  },
  faction: {
    id: String,
    name: String
  },
  description: String,
  abilities: [{
    name: String,
    description: String
  }],
  id: Number
});

module.exports = mongoose.model('Character', characterSchema);