const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const validateSession = async (req, res, next) => {
  try {
    //1.extract token from header
    const token = req.headers.authorization;
    console.log(token);

    //2. validate token & make sure it is not expired
    const decodedToken = jwt.verify(token, "secret");
    console.log(decodedToken);

    //3. check database to verify that you are an active user
    const user = await User.findById(decodedToken.id);

    //4. if user doesnt exist, throw error
    if (!user) {
      throw Error("User not found!");
    }

    //5. Create new key on req object called user
    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = validateSession;