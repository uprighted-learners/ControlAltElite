const express = require("express");
// const mongoose = require("mongoose");
const app = express();
const userController = require("./controllers/user.controller");

// (express.json()) will allows us to send a payload or request object to our server, and our routes will be able to parse it.
app.use(express.json());


//  *** Controller Routes ***
app.use("/user", userController);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
