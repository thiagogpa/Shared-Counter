const mongoose = require('mongoose');

//schema
const GroupSchema = new mongoose.Schema({
  group: {
    type: String,
  },
});

//schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  group: GroupSchema
});

module.exports = mongoose.model('user', UserSchema);
