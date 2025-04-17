const jwt = require("jsonwebtoken");
const Mentor = require("../models/mentor.model");
const Mentee = require("../models/mentee.model");

const validateSession = async (req, res, next) => {
  try {
    //1.extract token from header
    const token = req.headers.authorization;
    console.log(token);

    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    //2. validate token & make sure it is not expired
    const decodedToken = jwt.verify(token, "secret");

    const { id, userType } = decodedToken;

    //3. check database to verify that the user is active
    let user = null;
    // if/else statememnt to check usertypes
    if (userType === "Mentor") {
      user = await Mentor.findById(id);
    } else if (userType === "Mentee") {
      user = await Mentee.findById(id);
    } else if (userType === "Admin") {
      user = await Admin.findById(id);
    } else if (userType === "Parent") {
      user = await Parent.findById(id);
    } else {
      // Invalid user type
      return res.status(400).json({ message: "Invalid user type" });
    }

    // If user doesnt exist, give error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //5. Create new key on req object called user and usertype
    req.user = user;
    req.userType = userType;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = validateSession;