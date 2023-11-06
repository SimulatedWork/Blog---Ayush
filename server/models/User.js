const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (name) => validator.isString(name) && !validator.isEmpty(name),
      message: "Name must be a non-empty string.",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: "Email must be a valid email address.",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (password) =>
        validator.isStrongPassword(password, {
          minLength: 8,
          minUppercase: 1,
          minLowercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        }),
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.",
    },
  },
});

module.exports = mongoose.model("User", UserSchema);
