const mongoose = require("mongoose");

async function connectToMongoDB() {
  await mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((e) => {
      console.log("Error connecting to database", e);
    });
}

module.exports = connectToMongoDB;
