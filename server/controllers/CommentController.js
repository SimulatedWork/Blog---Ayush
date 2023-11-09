const express = require("express");
const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const authenticateToken = require("../middlewares/Authorization");
const commentRouter = express.Router();

// Getting comments for a specific blog post
commentRouter.get("/:blogId", authenticateToken, async (req, resp) => {
  const { blogId } = req.params;
  try {
    const comments = await Comment.find({ blog_id: blogId })
      .populate("author")
      .populate("repliedTo") // Populate the parent comment for nested replies
      .exec();
    if (!comments || comments.length === 0) {
      resp
        .status(404)
        .json({ message: "No comments found for this blog post." });
    }

    resp.status(200).json(comments);
  } catch (error) {
    resp.status(500).json({ error: error.message });
  }
});

// Posting a new comment or reply
commentRouter.post("/", authenticateToken, async (req, resp) => {
  const { content, author, blog_id, repliedTo } = req.body;
  try {
    const newComment = new Comment({
      content,
      author: new mongoose.Types.ObjectId(author),
      blog_id: new mongoose.Types.ObjectId(blog_id),
      repliedTo: repliedTo ? new mongoose.Types.ObjectId(repliedTo) : null,
    });
    await newComment.save();
    resp.status(201).json(newComment);
  } catch (error) {
    resp.status(500).json({ error: error.message });
  }
});

module.exports = commentRouter;
