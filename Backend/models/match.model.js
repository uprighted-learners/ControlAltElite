const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  menteeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mentee",
    required: true,
  },
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mentor",
    required: true,
  },
  mentorQuestion: {
    type: String,
  },
  menteeAnswer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Answer", AnswerSchema);
