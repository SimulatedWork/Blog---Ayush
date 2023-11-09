const User = require("../models/User");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middlewares/Authorization");
const userRouter = express.Router();
const profile = [
  "https://res.cloudinary.com/dcj2allfp/image/upload/v1699522695/n8dzabkvlxvtskexi9sx.png",
  "https://res.cloudinary.com/dcj2allfp/image/upload/v1699522696/yuqg9fxuzsvngqqo5rg4.gif",
  "https://res.cloudinary.com/dcj2allfp/image/upload/v1699522953/qzr7kmn6wl1zla5so5az.png",
  "https://res.cloudinary.com/dcj2allfp/image/upload/v1699522952/nvjhq2jnap75ggj0ddap.png",
  "https://res.cloudinary.com/dcj2allfp/image/upload/v1699522951/wxqlbvip0b0lnbec9kq9.png",
];

// Getting all the users
userRouter.get("/", authenticateToken, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// signing a new user in
userRouter.post("/signup", async (req, resp) => {
  const { name, email, password } = req.body;

  try {
    const getUser = await User.findOne({ email });
    if (getUser) {
      resp.status(400).json({ error: "Email already exists. Please Login." });
    }
    if (!name || !email || !password) {
      return resp
        .status(400)
        .json({ error: "Please provide name, email, and password." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      profile: profile[Math.floor(Math.random() * profile.length)],
    });
    await user.save();
    const token = signToken({ email, password });
    resp.status(201).json({ ...user._doc, token });
  } catch (error) {
    resp.status(400).json({ error: error.message });
  }
});

//Logging a user in
userRouter.post("/login", async (req, resp) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      resp.status(400).json({ error: "Please check your email." });
    }
    bcrypt.compare(password, user.password, (err, res) => {
      if (err) {
        resp.status(500).json({ error: "Something went wrong!" });
      }

      if (res) {
        const token = signToken({ email, password });
        resp.status(201).json({ ...user._doc, token });
      } else {
        resp.status(501).json({ error: "Password is incorrect." });
      }
    });
  } catch (error) {
    resp.status(500).json({ e: error.message });
  }
});

function signToken(payload) {
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });
  return token;
}

module.exports = userRouter;
