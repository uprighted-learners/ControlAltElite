const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["Admin", "Mentor", "Mentee", "Parent"],
    default: "Admin",
    required: true,
  },
  
  
});


module.exports = mongoose.model("Admin", AdminSchema);