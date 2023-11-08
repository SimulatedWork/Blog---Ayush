const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (name) => typeof name === "string" && !validator.isEmpty(name),
      message: "Name must be a non-empty string.",
    },
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
});

module.exports = mongoose.model("User", UserSchema);
