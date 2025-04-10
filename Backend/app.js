const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userController = require("./controllers/user.controller");
const matchController = require("./controllers/match.controller")

// Connecting to the Database
mongoose.connect("mongodb://localhost:27017/ctrlaltelite-db");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));

// (express.json()) will allows us to send a payload or request object to our server, and our routes will be able to parse it.
app.use(express.json());

//  *** TODO Controller Routes BELOW ***
app.use("/user", userController);
app.use("/match", matchController);


const PORT = 4000;

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
