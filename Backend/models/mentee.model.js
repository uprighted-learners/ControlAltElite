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
  // userType: {
  //   enum: ["Mentor", "Mentee"],
  //   default: "Mentee",
  // },

  // Mentee specific fields:
  requestedMentors: {
    
  },
  approvedMentors: {

  },
  interests: {
    type: String,
    required: false,
  },
  zipcode: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Mentee", MenteeSchema);
