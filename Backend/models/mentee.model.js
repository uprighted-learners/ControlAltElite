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
  requestedMentors: [{}],
  approvedMentors: [{}],
  age: {
    type: Number,
    required: false, // Initially false, but is required for profile completion
  },
  interests: {
    type: String,
    required: false, // Initially false, but is required for profile completion
  },
  school: {
    type: String,
    required: false, // Initially false, but is required for profile completion
  },
  guardianEmail: {
    type: String,
    required: false, // Initially false, but is required for profile completion
  },
});

module.exports = mongoose.model("Mentee", MenteeSchema);
