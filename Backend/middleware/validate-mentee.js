// Used to make it so only mentees can view mentor specific routes
const Mentee = require("../models/mentee.model");

const validateMentee = async (req, res, next) => {
  try {
    // Check if user is logged in
    if (!req.user) {
      return res.status(401).json({ message: "You must be logged in as a mentee" });
    }
    
    // Ensure userType is Mentee
    if (req.userType !== "Mentee") {
      return res.status(403).json({ 
        message: "Access denied. This page is only for mentees." 
      });
    }
    
    // Verify that the user exists as a mentee
    const isMentee = await Mentee.findById(req.user._id);

    if (!isMentee) {
      return res.status(404).json({ message: "Mentee user not found" });
    }

    console.log("Mentee user validation successful");
    return next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = validateMentee;