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
  //   ! May or may not need role - maybe decide this from userType...
  //   role: {
  //     type: String,
  //     enum: ["Professor", "Site-admin"],
  //     default: "Professsor",
  //     required: true,
  //   },
  // object to track mentor invitations (only can be sent by admin)
  sentInvitations: [
    {
      email: String,
      date: Date,
      status: {
        type: String,
        enum: ["pending", "accepted", "expired"],
        default: "pending",
      },
    },
  ],
});


module.exports = mongoose.model("Admin", AdminSchema);