require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectToMongoDB = require("./connections/MongoConnection");
const userRouter = require("./controllers/UserController");
const blogRouter = require("./controllers/BlogController");
const commentRouter = require("./controllers/CommentController");
const PORT = process.env.PORT;
const log = console.log;

app.use(cors());
app.use(express.json());
app.get("/", (req, resp) => {
  log(req.path);
  resp.json({ message: "Hello from the server side" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/comments", commentRouter);

app.listen(PORT, () => {
  connectToMongoDB();
  log(`Listening on PORT:${PORT}`);
});
