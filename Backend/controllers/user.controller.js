const router = require("express").Router();
const validateSession = require("../middleware/validate-session");
// Import JSONWEBTOKEN for token creation
const jwt = require("jsonwebtoken");
// Import BCRYPT to hash passwords
const bcrypt = require("bcrypt");
// Model Imports
const Mentor = require("../models/mentor.model");
const Mentee = require("../models/mentee.model");

// TODO Register user route
// Endpoint: http://localhost:4000/user/register
// Request Type: POST
router.post("/register", async (req, res) => {
  console.log("In register route");
  try {
    // Destructure the request body:
    const { firstName, lastName, email, password, zipCode } = req.body;

    // Check if email ends in "bennington.edu" then assign userType to be mentor
    let userType;
    if (email.endsWith("@bennington.edu")) {
      userType = "Mentor";
    } else {
      if (zipCode === "05201") {
        userType = "Mentee";
      } else {
        throw new Error("Invalid email and district code");
      }
    }
    // Append userType to the request body
    req.body.userType = userType;
    // Check if userType is either Mentor or Mentee
    if (userType !== "Mentor" && userType !== "Mentee") {
      return res.status(400).json({ message: "Invalid user type" });
    }

    // TODO Notify if user email has already been used
    const existingUser =
      (await Mentor.findOne({ email: email })) ||
      (await Mentee.findOne({ email: email }));
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // establish empty user variable
    let user = null;
    console.log(userType); //*
    // Create user
    // use if/else statement based on userType
    if (userType === "Mentor") {
      user = new Mentor({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: bcrypt.hashSync(password, 10),
      });
    } else {
      user = new Mentee({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: bcrypt.hashSync(password, 10),
      });
    }
    //  Save the new user in the database and store the response in a variable (saved user)
    const newUser = await user.save();

    // Create JWT token
    const token = jwt.sign(
      { id: newUser._id, userType: userType },
      process.env.JWT_SECRET || "secret",
      {
        // Use environment variable
        expiresIn: "7d",
      }
    );
    console.log(token);
    res.status(201).json({
      message: ` New ${newUser.firstName} successfully registered!`,
      token: token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        userType: newUser.userType,
      },
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// TODO Route for Login
// ENDPOINT: "http://localhost:4000/user/login"
// Request type: POST
router.post("/login", async (req, res) => {
  try {
    // Destructure body
    const { email, password } = req.body;

    //  ?Check the database to see if the user email exists
    // const user = await User.findOne({ email: email });

    // ? Check datatbase for user (must check both mentor and mentee)
    // look first in saved mentors, then saved mentees if no match.
    // if no user found in either, give error message
    let user = await Mentor.findOne({ email: email });
    let userType = "Mentor";

    if (!user) {
      user = await Mentee.findOne({ email: email });
      userType = "Mentee";
    }
    //  If user doesn't exist anywhere, give error
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check/compare provided password if user found
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    console.log("password is valid");
    // If user found and password is valid, create JWT token
    const token = jwt.sign(
      { id: user._id, userType: userType },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: `Welcome, ${user.firstName}. You have been successfuly logged in.`,
      token: token,
      id: user._id,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// TODO Route to get user profile
// ENDPOINT: "http://localhost:4000/user/profile/:id"
// Request type: GET
router.get("/mentor/profile/:id", validateSession, async (req, res) => {
  try {
    //1. store id in a variable
    const id = req.params.id;
    console.log(id);
   
    //2. supply req.body only with fields that user should be able to update
    // dont let user change their userType
    const { bio, interests, questionToAsk } = req.body;

    // 3. Check if the user exists
    const user = await Mentor.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User found");
    // 4. Update the user information using mapping
    const updatedUser = await Mentor.findById(id);
    //3. Update the user information
    updatedUser.bio = bio;
    updatedUser.interests = interests;
    updatedUser.questionToAsk = questionToAsk;
    //4. Save the user information
    await updatedUser.save();
    //5. Send back the updated user information
    console.log(updatedUser);

    console.log("User found 2", updatedUser);
    // if update not successful, give error
    // if (!updatedUser) {
    //   return res.status(404).json({ message: "Error updating user" });
    // }
    res.status(200).json({
      message: `User successfully updated`,
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        bio: updatedUser.bio,
        interests: updatedUser.interests,
        questionToAsk: updatedUser.questionToAsk,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/mentee/profile/:id", validateSession, async (req, res) => {
  try {
    //1. store id in a variable
    const id = req.params.id;
  
    const { bio } = req.body;

    // 3. Check if the user exists
    const user = await Mentee.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // 5. Save the user information
    await updatedUser.save();
    // if update not successful, give error
    if (!updatedUser) {
      return res.status(404).json({ message: "Error updating user" });
    }
    res.status(200).json({
      message: `User successfully updated`,
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ToDo Route to delete user
// ENDPOINT: "http://localhost:4000/user/delete/:id"
// Request type: DELETE
router.delete("/delete/:id", validateSession, async (req, res) => {
  try {
    //1. store id in a variable
    const id = req.params.id;

    // First try to delete from Mentors
    // if mentor delete count is zero, try deleting from mentee
    const deletedMentor = await Mentor.deleteOne({ _id: id });
    if (deletedMentor.deletedCount === 0) {
      const deletedMentee = await Mentee.deleteOne({ _id: id });
      // If no mentee was found to delete either, return user not found
      if (deletedMentee.deletedCount === 0) {
        return res.status(404).json({ message: "User not found" });
      } else {
        //  else mentor successfull deletion
        return res.status(200).json({
          message: "Mentor successfully deleted from the database",
          deletedUser: "Mentor",
        });
      }
    } else {
      // else mentee successful deletion
      return res.status(200).json({
        message: "Mentee successfully deleted from the database",
        deletedUser: "Mentee",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
