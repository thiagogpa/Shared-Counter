const mongoose = require('mongoose');

//schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model('user', UserSchema);
