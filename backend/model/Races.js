const mongoose = require('mongoose');

const racesSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  faction: [
    {
      id: String,
      name: String
    }
  ]
});

module.exports = mongoose.model('Races', racesSchema);