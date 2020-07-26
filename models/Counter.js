const mongoose = require('mongoose');

//schema
const CounterSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true
  },
  counter: {
    type: Number,
  }
});



module.exports = mongoose.model('counter', CounterSchema);
