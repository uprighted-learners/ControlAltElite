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
  // ref allows .populate() to be used in controllers - tells mongoose which model to use

  approvedMentees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentee",
    },
  ],
  menteeRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentee",
    },
  ],
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
  projectCategory: {
    type: String,
    enum: ["video", "science"],
    required: false,
  },
});

module.exports = mongoose.model("Mentor", MentorSchema);