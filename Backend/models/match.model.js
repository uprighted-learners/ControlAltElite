const mongoose = require("mongoose");

let matchRequestSchema = new mongoose.Schema({
    menteeId: { type: String, required: true },
    mentorId: { type: String, required: true },
    status: { type: String, default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("MatchRequest", matchRequestSchema);