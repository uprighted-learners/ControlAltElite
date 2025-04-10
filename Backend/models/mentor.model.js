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
    type: String, 
    enum: ["Mentor", "Mentee"],
    default: "Mentor",
    required: true,
  },

  // Mentor specific profile fields
  //   ! match requests
  approvedMentees: [{},],
  menteeRequests: [{}],

  // 
  profilePhoto: {
    type: String, // URL for uploaded photo
    required: false, // Changed from true to false after initial push
  },
  bio: {
    type: String,
    required: false,
  },
  interests: {
    type: String,
    required: false, 
  },
  questionToAsk: {
    type: String,
    required: false, 
  },
});

module.exports = mongoose.model("Mentor", MentorSchema);
