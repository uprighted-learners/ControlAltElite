console.log("This is the match request controller");

const router = require("express").Router();
const validateSession = require("../middleware/validate-session");
const Mentor = require("../models/mentor.model");
const Mentee = require("../models/mentee.model");
const MatchRequest = require("../models/match-request.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// TODO route for mentee to request mentor

// TODO match request
// TODO match request
// ENDPOINT: "http://localhost:4000/user/request"
// TODO Request type: POST
//
// Endpoint: http://localhost:4000/user/request
// Request Type: POST
// Request type: POST
router.post("/request", validateSession, async (req, res) => {
  try {
    //1.  recieve match request from mentee and store in variable
    const { mentorId } = req.body;

    //2. Extract the menteeId from validateSession
    const menteeId = req.user.id;
    console.log(menteeId);

    //3. Check if mentee already has an existing match equest
    const existingRequest = await MatchRequest.findOne({ where: { menteeId } });

    if (existingRequest) {
      return res.status(400).json({ message: "Existing match request found" });
    }

    //4. Find Mentor profile by mentorId
    const mentor = await Mentor.findById(mentorId);
    console.log(mentor);

    //5. Check if mentor exists in the database
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    //6. Create a new match request
    const matchRequest = await MatchRequest.create({
      menteeId,
      mentorId,
      status: "pending",
    });
    console.log(matchRequest);

    //7. Save match request to requestedMentors array in Mentee profile
    const mentee = await Mentee.findById(menteeId);
    console.log(mentee);
    mentee.requestedMentors.push(matchRequest._id);
    await mentee.save();
    console.log(mentee, " Mentee profile updated successfully.");
    //8. Save request to menteeRequest array in Mentor profile
    mentor.menteeRequests.push(matchRequest._id);
    await mentor.save();
    console.log(mentor, " Mentor profile updated successfully.");

    return res
      .status(201)
      .json({ message: "Match request created", matchRequest });
  } catch (error) {
    res.json({ message: error.message });
  }
});
