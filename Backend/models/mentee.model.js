const mongoose = require("mongoose");

const MenteeSchema = new mongoose.Schema({
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
    type: String, // Added this line after merging
    enum: ["Mentor", "Mentee"],
    default: "Mentee",
    required: true,
  },

  // Mentee specific fields:
  requestedMentors: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  approvedMentors: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  age: {
    type: Number,
    required: false, // Initially false for basic signup, but is required for profile completion
  },
  interests: {
    type: String,
    required: false,
  },
  school: {
    type: String,
    enum: [
      "Grace Christian School",
      "Mount Anthony Middle High School",
      "Mount Anthony Union High School",
    ],
    required: false,
  },
  guardianEmail: {
    type: String,
    required: false,

  },
});

module.exports = mongoose.model("Mentee", MenteeSchema);
