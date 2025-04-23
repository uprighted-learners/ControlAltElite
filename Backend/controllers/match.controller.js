const router = require("express").Router();
const validateSession = require("../middleware/validate-session");
const Mentor = require("../models/mentor.model");
const Mentee = require("../models/mentee.model");
const Answer = require("../models/match.model");

// ! route for mentee to request mentor (match Request)
// Mentee must answer mentor's question to request
// ENDPOINT: http://localhost:4000/match/request/:mentorId
// Request Type: POST
router.post("/request/:mentorId", validateSession, async (req, res) => {
  try {
    // get mentee's id info fromn req.user
    const menteeId = req.user._id;
    // Get mentor's id from URL parameter
    const mentorId = req.params.mentorId;
    // get answer field from req.body
    const { answer } = req.body;

    // get user from id
    const mentee = await Mentee.findById(menteeId);
    const mentor = await Mentor.findById(mentorId);

    // Only require answer if mentor has a question
    if (mentor.questionToAsk && mentor.questionToAsk.trim() !== "") {
      // MENTEE must then answer mentor's questionToAsk
      if (!answer) {
        return res.status(400).json({
          message: `You must answer ${mentor.firstName}'s question: "${mentor.questionToAsk}"`,
          mentorQuestion: mentor.questionToAsk,
        });
      }
    }

    // Check if match request has already been made
    if (mentee.requestedMentors.includes(mentorId)) {
      return res.status(400).json({
        message: `You have already requested to match with ${mentor.firstName} ${mentor.lastName}.`,
        mentorId: mentorId,
        menteeId: menteeId,
      });
    }

    // Save mentee's answer to mentor's question if it was provided:
    if (mentor.questionToAsk && mentor.questionToAsk.trim() !== "" && answer) {
      const newAnswer = new Answer({
        menteeId: menteeId,
        mentorId: mentorId,
        mentorQuestion: mentor.questionToAsk,
        menteeAnswer: answer,
      });
      await newAnswer.save();
    }

    // Add to mentee's requestedMentors array
    mentee.requestedMentors.push(mentorId);
    await mentee.save();

    // Add to mentor's menteeRequests array
    mentor.menteeRequests.push(menteeId);
    await mentor.save();

    res.status(200).json({
      message: `Mentor match request to ${mentor.firstName} ${mentor.lastName} was sent successfully`,
      mentorId: mentorId,
      menteeName: `${mentee.firstName} ${mentee.lastName}`,
      menteeId: menteeId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! route for mentor to accept match request
// ENDPOINT: http://localhost:4000/match/accept
// Request Type: POST
router.post("/accept/:menteeId", validateSession, async (req, res) => {
  try {
    // get mentorId
    const mentorId = req.user._id;

    // Get mentee's id from URL parameter
    const menteeId = req.params.menteeId;

    // Find both mentor and mentee for arrays
    const mentor = await Mentor.findById(mentorId);
    const mentee = await Mentee.findById(menteeId);

    //! Remove from request arrays and add to approved arrays
    // (using mongoose) .pull() does essentially the reverse of .push()
    // Remove mentee's id from mentor's menteeRequests array
    mentor.menteeRequests.pull(menteeId);
    // Remove mentor's id from mente's requestedMentors array
    mentee.requestedMentors.pull(mentorId);

    // ! Then, push into the approved match arrays for each user
    // Add mentee to mentor's approvedMentees
    mentor.approvedMentees.push(menteeId);
    await mentor.save();

    // Add mentor to mentee's approvedMentors
    mentee.approvedMentors.push(mentorId);
    await mentee.save();

    res.status(200).json({
      message: `Match accepted successfully! You are now connected with ${mentee.firstName} ${mentee.lastName}.`,
      mentorId: mentorId,
      menteeId: menteeId,
    });
  } catch (error) {
    // Improved error handling with proper status code
    res.status(500).json({
      message: "Failed to accept match. Please try accepting the mentee again.",
      error: error.message,
    });
  }
});

// ! view all requests (both mentor and mentee)
// if/else statement for user type
// Endpoint: http://localhost:4000/match/view-requests
// Request: GET
router.get("/view-requests", validateSession, async (req, res) => {
  try {
    // get userId and userType
    const userId = req.user._id;
    const userType = req.userType;

    // If usertype is MENTOR:
    if (userType === "Mentor") {
      //  use .populate() to get data from menteeRequest array
      const mentor = await Mentor.findById(userId).populate("menteeRequests");
      // If array is empty, no matches - tell Mentor
      if (mentor.menteeRequests.length === 0) {
        return res.status(200).json({
          message: "You have not recieved any mentee match requests",
        });
      }
      // format the mentee data using .map to return to mentor
      const formattedMentees = mentor.menteeRequests.map((mentee) => ({
        menteeId: mentee._id,
        firstName: mentee.firstName,
        lastName: mentee.lastName,
        email: mentee.email,
      }));
      // give success response when matches are found
      res.status(200).json({
        message: "Match requests found successfully",
        mentees: formattedMentees,
      });

      // ! userType is mentee - look for requests sent to mentors
    } else if (userType === "Mentee") {
      //  use .populate() to get data from requestedMentors array
      const mentee = await Mentee.findById(userId).populate("requestedMentors");

      // If array is empty, no requests have been sent - return a message
      if (mentee.requestedMentors.length === 0) {
        return res.status(200).json({
          message: "You have not yet requested a mentor",
        });
      }
      // format the mentor data using .map inside the requestedMentor array
      const formattedMentors = mentee.requestedMentors.map((mentor) => ({
        mentorId: mentor._id,
        profilePhoto: mentor.profilePhoto,
        firstName: mentor.firstName,
        lastName: mentor.lastName,
        email: mentor.email,
      }));
      // give mentee a success response if successful
      res.status(200).json({
        message: "Match requests found successfully",
        requests: formattedMentors,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve requests",
      error: error.message,
    });
  }
});

// ! route to view all matches
// similar to view requests, but here it needs to look in the approvedMatch arrays
// ENDPOINT: http://localhost:4000/match/view-matches
// Request Type: GET

router.get("/view-matches", validateSession, async (req, res) => {
  try {
    // get userId and userType
    const userId = req.user._id;
    const userType = req.userType;

    //  ! If userType is MENTOR:
    if (userType === "Mentor") {
      //  use .populate() to get data from approvedMentee array
      const mentor = await Mentor.findById(userId).populate("approvedMentees");

      //  If array is empty, tell mentor there are no approved matches
      if (mentor.approvedMentees.length === 0) {
        return res.status(200).json({
          message: "You have not yet accepted any mentee match requests",
        });
      }
      // if array has data, format using .map
      const formattedMentees = mentor.approvedMentees.map((mentee) => ({
        menteeId: mentee._id,
        firstName: mentee.firstName,
        lastName: mentee.lastName,
        email: mentee.email,
      }));
      res.status(200).json({
        message: "Your matched mentees were retrieved successfully",
        matches: formattedMentees,
      });

      // ! if userType is MENTEE:
    } else if (userType === "Mentee") {
      //  use .populate() to get data from approvedMentor array
      const mentee = await Mentee.findById(userId).populate("approvedMentors");

      // If array is empty, there are no matches - tell mentee
      if (mentee.approvedMentors.length === 0) {
        return res.status(200).json({
          message: "You have not yet been matched with a mentor",
        });
      }
      // if array has data, format using .map
      const formattedMatches = mentee.approvedMentors.map((mentor) => ({
        mentorId: mentor._id,
        profilePhoto: mentor.profilePhoto,
        firstName: mentor.firstName,
        lastName: mentor.lastName,
        email: mentor.email,
      }));
      // Give success message
      res.status(200).json({
        message: "Your matched mentors were retrieved successfully",
        matches: formattedMatches,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to find any matches",
      error: error.message,
    });
  }
});

// !Route to Cancel an outgoing match request (mentee requesting mentor)
// Endpoint: http://localhost:4000/match/cancel/:mentorId
// Request Type: POST
router.post("/cancel/:mentorId", validateSession, async (req, res) => {
  try {
    // Get mentee's id from the token & mentors id from the URL
    const menteeId = req.user._id;
    const mentorId = req.params.mentorId;

    // Find both users from their ID's
    const mentee = await Mentee.findById(menteeId);
    const mentor = await Mentor.findById(mentorId);

    // make sure that the mentor that the mentee is trying to cancel request to actually exists
    if (!mentor) {
      return res.status(404).json({
        message: "Invalid ID - no mentor was found",
      });
    }

    // Remove mentor from mentee's array and save updated array
    mentee.requestedMentors.pull(mentorId);
    await mentee.save();

    // remove mentee form MENTOR's array and save the updated array
    mentor.menteeRequests.pull(mentorId);
    await mentor.save();

    res.status(200).json({
      message: `Your request to match with ${mentor.firstName} ${mentor.lastName} was cancelled successfully`,
      mentorId: mentorId,
      menteeId: menteeId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for Mentor to deny a match request
// Endpoint: http://localhost:4000/match/deny/:menteeId
// Request Type: POST
router.post("/deny/:menteeId", validateSession, async (req, res) => {
  try {
    // get mentor's id from the token and mentee's id from the URL
    const mentorId = req.user._id;
    const menteeId = req.params.menteeId;
    l;

    // Find both users from their id's
    const mentor = await Mentor.findById(mentorId);
    const mentee = await Mentee.findById(menteeId);

    // Check if the mentee actaully exists
    if (!mentee) {
      return res.status(404).json({
        message: "Invalid ID - no mentee was found",
      });
    }

    // Remove mentee from mentor's array and save
    mentor.menteeRequests.pull(menteeId);
    await mentor.save();

    // Remove mentor from mentee's array and save

    mentee.requestedMentors.pull(mentorId);
    await mentee.save();

    res.status(200).json({

      message: `The match request from ${mentee.firstName} ${mentee.lastName} has been denied.`,
      mentorId: mentorId,
      menteeId: menteeId,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
