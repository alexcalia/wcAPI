const mongoose = require('mongoose');

const classesSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  specializations: [
    {
      name: String,
      description: String
    }
  ]
});

module.exports = mongoose.model('Classes', classesSchema);