const mongoose = require('mongoose');

//schema
const GroupSchema = new mongoose.Schema({
  group: {
    type: String,
  },
});

module.exports = mongoose.model('group', GroupSchema);
