const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  blog_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog", // Reference to the Blog model
    required: true,
  },
  repliedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment", // Reference to the Comment model for nesting replies
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
