const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    indexedDB: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: "Email must be a valid email address.",
    },
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
