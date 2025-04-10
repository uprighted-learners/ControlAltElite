const mongoose = require("mongoose");

const MentorSchema = new mongoose.Schema({
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
    enum: ["Mentor", "Mentee"],
    default: "Mentor",
    required: true,
  },

  // Mentor specific profile fields
  //   ! match requests
  approvedMentees: {},
  menteeRequests: {},

  profilePhoto: {
    type: String, // URL for uploaded photo
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  interests: {
    type: String,
    required: true,
  },
  questionToAsk: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Mentor", MentorSchema);
