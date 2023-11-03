const express = require("express");
const app = express();
const PORT = 8000;
const log = console.log;

app.get("/", (req, resp) => {
  resp.json({ message: "Hello from the server side" });
});

app.listen(PORT, () => {
  log(`Listening on PORT:${PORT}`);
});
