const mongoose = require('mongoose');

const factionSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    description: String
  }
);

module.exports = mongoose.model('Faction', factionSchema);