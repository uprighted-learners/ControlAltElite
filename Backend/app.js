require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userController = require("./controllers/user.controller");
const matchController = require("./controllers/match.controller");

// ! Connecting to the Database
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));

// (express.json()) will allows us to send a payload or request object to our server, and our routes will be able to parse it.
app.use(express.json());
// add cors before routes
app.use(cors());

//  *** TODO Controller Routes BELOW ***
app.use("/user", userController);
app.use("/match", matchController);

const HOST = process.env.HOST;
const PORT = 4000;

const uploadURL = require("./s3");
// uploadURL();

app.use(express.static("Static"));

// !Get image endpoint needed for s3 upload
app.get("/geturl", async (req, res) => {
  try {
    const url = await uploadURL();
    res.status(200).json(url);
  } catch (error) {
    res.status(500).json({ message: "Failed to generate image upload URL" });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}, listening on ${HOST}`);
});