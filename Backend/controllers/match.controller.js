const router = require("express").Router();
const validateSession = require("../middleware/validate-session");
const Mentor = require("../models/mentor.model");
const Mentee = require("../models/mentee.model");

// TODO route for mentee to request mentor
// ENDPOINT: http://localhost:4000/match/request
// Request Type: POST
router.post("/request", validateSession, async (req, res) => {
  try {
    // get mentee's id info fromn req.user
    const menteeId = req.user.id;

    // get user from id/email
    const mentee = await Mentee.findById(menteeId);
    const mentor = await Mentor.findById(mentorId);

    // Add to mentee's requestedMentors array
    mentee.requestedMentors.push(mentorId);
    await mentee.save();

    // Add to mentor's menteeRequests array
    mentor.menteeRequests.push(menteeId);
    await mentor.save();

    res.status(200).json({
      message: "Mentor match request sent successfully",
      mentorId: mentorId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// TODO route for mentor to accept request
// ENDPOINT: http://localhost:4000/match/accept
// Request Type: POST
router.post("/accept", validateSession, async (req, res) => {
  try {
    // get mentorId
    const mentorId = req.user.id;
    // Get mentee's id from req.body
    const { menteeId } = req.body;

    // Find both mentor and mentee for arrays
    const mentor = await Mentor.findById(mentorId);
    const mentee = await Mentee.findById(menteeId);

    //TODO  Remove from request arrays and add to approved arrays

    // Add mentee to mentors approvedMentees
    mentor.approvedMentees.push(menteeId);
    await mentor.save();

    // Add mentor to mentee's approvedMentors
    mentee.approvedMentors.push(mentorId);
    await mentee.save();

    res.json({ message: `route works` });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// TODO view all requests

// TODO view all matches

module.exports = router;
