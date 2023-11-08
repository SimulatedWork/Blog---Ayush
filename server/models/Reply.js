const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  repliedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Reply", ReplySchema);
