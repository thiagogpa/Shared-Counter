const mongoose = require("mongoose");

//schema
const GroupSchema = new mongoose.Schema({
  group: {
    type: String,
  },
});

//schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  groups: [GroupSchema]
});

module.exports = mongoose.model("user", UserSchema);
