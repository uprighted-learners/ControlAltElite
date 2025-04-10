const router = require("express").Router();
const validateSession = require("../middleware/validate-session");
const Mentor = require("../models/mentor.model");
const Mentee = require("../models/mentee.model");

// TODO route for mentee to request mentor
// ENDPOINT: http://localhost:4000/match/request
// Request Type: POST
router.post('/request', validateSession, async (req, res) => {
try{
    // // get mentee's id info fromn req.user
    const menteeId = req.user.id;

    // // get user from id/email
    // const mentee = await Mentee.findById(menteeId);
    // const mentor = await Mentor.findOne
    
res.json({ message: `route works` });
} catch (error) {
res.json({ message: error.message });
}
})


module.exports = router;
