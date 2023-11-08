const express = require("express");
const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const Reply = require("../models/Reply");
const authenticateToken = require("../middlewares/Authorization");
const commentRouter = express.Router();

//Getting all the comments.
commentRouter.get("/", async (req, resp) => {
  try {
    const comments = await Comment.find({});
    if (!comments) {
      resp.status(201).json({ message: "No comments on this post till now." });
    }
    resp.status(200).json(comments);
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
});

//Posting a new comment specific to a blog
commentRouter.post("/", authenticateToken, async (req, resp) => {
  const { content, author, blog_id } = req.body;
  try {
    const newComment = new Comment({
      content,
      author: new mongoose.Types.ObjectId(author),
      blog_id: new mongoose.Types.ObjectId(blog_id),
    });
    if (!newComment) {
      resp
        .status(401)
        .json({ error: "Something went wrong while posting the comment." });
    }
    await newComment.save();
    resp.status(201).json(newComment);
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
});

//Posting a new comment
commentRouter.post(
  "/:commentId/replies",
  authenticateToken,
  async (req, res) => {
    const { commentId } = req.params;
    const { content, author } = req.body;

    try {
      const comment = await Comment.findById({ _id: commentId });
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      const newReply = new Reply({
        content,
        author: new mongoose.Types.ObjectId(author),
        repliedTo: commentId,
      });

      await newReply.save();
      comment.replies.push(newReply);
      await comment.save();

      res.status(200).json(newReply);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Replying to a blog
commentRouter.get("/replies", async (req, resp) => {
  try {
    const replies = await Reply.find();
    if (!replies) {
      resp.status(201).json({ message: "No Replies" });
    }
    resp.status(201).json(replies);
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
});

module.exports = commentRouter;
