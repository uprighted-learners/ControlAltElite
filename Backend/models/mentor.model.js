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
  // userType: {
  //   enum: ["Mentor", "Mentee"],
  //   default: "Mentor",
  //   required: true,
  // },
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
  menteeRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MatchRequest",
    },
  ],
  approvedMentees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentee",
    },
  ],
});

module.exports = mongoose.model("Mentor", MentorSchema);
