const User = require("../models/User");
const express = require("express");

const userRouter = express.Router();

//Getting all the users
userRouter.get("/", async (req, resp) => {});

//Logging a new user in
userRouter.post("/new", async (req, resp) => {});

module.exports = userRouter;
