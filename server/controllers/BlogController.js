const express = require("express");
const mongoose = require("mongoose");
const blogRouter = express.Router();
const Blog = require("../models/Blog");
const authenticateToken = require("../middlewares/Authorization");

//getting all the blogs
blogRouter.get("/", async (req, resp) => {
  try {
    const blogs = await Blog.find({});
    resp.status(201).json(blogs);
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
});

//getting a single blog by id
blogRouter.get("/:_id", authenticateToken, async (req, resp) => {
  const { _id } = req.params;
  try {
    const blog = await Blog.findOne({ _id });
    if (!blog) {
      resp.status(401).json({ message: "No such blog existing" });
    }
    resp.status(201).json(blog);
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
});

//posting a new blog
blogRouter.post("/post", authenticateToken, async (req, resp) => {
  try {
    // Extract data from the request body
    const { title, content, cover_image, author_id } = req.body;

    // Create a new blog object using the Blog model
    const newBlog = new Blog({
      title,
      cover_image,
      content,
      author_id: new mongoose.Types.ObjectId(author_id),
    });
    if (!newBlog) {
      resp.status(401).json({
        error: "Error! Couldn't upload the blog, Please try again later.",
      });
    }
    await newBlog.save();
    resp.status(201).json(newBlog);
  } catch (error) {
    resp.status(500).json({ error: error.message });
  }
});

// Editing a blog
blogRouter.put("/edit/:id", authenticateToken, async (req, resp) => {
  const { id } = req.params;
  const { title, cover_image, content } = req.body;

  try {
    const blog = await Blog.findByIdAndUpdate(id, {
      title,
      cover_image,
      content,
    });
    if (!blog) {
      resp.status(401).json({ message: "No such blog exists" });
    }

    await blog.save();
    resp.status(201).json(blog);
  } catch (error) {
    resp.status(500).json({ error: error.message });
  }
});

module.exports = blogRouter;
