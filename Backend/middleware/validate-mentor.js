// Used to make it so only mentors can view mentor specific routes
const Mentor = require("../models/mentor.model");

const validateMentor = async (req, res, next) => {
  try {
    // Check if user is logged in
    if (!req.user) {
      return res.status(401).json({ message: "You must be logged in as a mentor" });
    }
    
    // Ensure userType is Mentor
    if (req.userType !== "Mentor") {
      return res.status(403).json({ 
        message: "Access denied. This page is only for mentors." 
      });
    }
    
    // Verify that the user exists as a mentor
    const isMentor = await Mentor.findById(req.user._id);

    if (!isMentor) {
      return res.status(404).json({ message: "Mentor user not found" });
    }

    console.log("Mentor validation was successful");
    return next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = validateMentor;