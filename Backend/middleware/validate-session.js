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
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    console.log("decodedToken", decoded);

    //3. check database to verify that the user is active
    const user = await Mentor.findById(decoded.id) || await Mentee.findById(decoded.id);
       

    // If user doesnt exist, give error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    //4. Check if user is a mentor or mentee
    const userType = user instanceof Mentor ? "mentor" : "mentee";
    console.log("userType", userType);
    
    // If userType is not found, give error
    if (!userType) {
      return res.status(403).json({ message: "User type is not valid" });
    }
    //5. Create a new key on the req object called user
    req.user = user;
    req.userType = userType;

    console.log("User validated successfully");
    return next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = validateSession;
