const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userController = require("./controllers/user.controller");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// Connecting to the Database
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));

// (express.json()) will allows us to send a payload or request object to our server, and our routes will be able to parse it.
app.use(express.json());
app.use(cors())

//  *** TODO Controller Routes BELOW ***
app.use("/user", userController);


const PORT = 4000;

app.listen(PORT, () => {
  console.log("Connected to the Database");
  console.log(`server is running on port: ${PORT}`);
});
