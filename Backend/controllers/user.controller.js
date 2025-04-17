const router = require("express").Router();
const validateSession = require("../middleware/validate-session");
// Import JSONWEBTOKEN for token creation
const jwt = require("jsonwebtoken");
// Import BCRYPT to hash passwords
const bcrypt = require("bcrypt");
// Model Imports
const Mentor = require("../models/mentor.model");
const Mentee = require("../models/mentee.model");

// ! Register user route
// Endpoint: http://localhost:4000/user/register
// Request Type: POST
router.post("/register", async (req, res) => {
  try {
    // Destructure the request body:
    let { firstName, lastName, email, password, userType } = req.body;

    if (email.toLowerCase().endsWith("@placeholder.edu")) {
      userType = "Mentor";
    }

    // Make sure userType is provided:
    if (!userType) {
      return res
        .status(400)
        .json({ message: "Your user type is required (Mentor or Mentee)" });
    }

    // TODO Notify if user email has already been used

    // establish empty user variable
    let user = null;

    // Create user
    // use if/else statement based on userType
    if (userType === "Mentor") {
      user = new Mentor({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: bcrypt.hashSync(password, 10),
        approvedMentees: [], //empty array to push accepted mentee into
        menteeRequests: [], // empty array to push match requests into
      });
    } else {
      user = new Mentee({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: bcrypt.hashSync(password, 10),
        approvedMentors: [], // empty array to push accepted mentor into
        requestedMentors: [], // empty array to keep track of match request
      });
    }

    //  Save the new user in the database and store the response in a variable (saved user)
    const newUser = await user.save();

    // Create JWT token
    const token = jwt.sign({ id: newUser._id, userType: userType }, "secret", {
      expiresIn: "7d",
    });

    // Success message that returns updated user info
    res.status(201).json({
      message: ` New ${newUser.userType} successfully registered!`,
      token: token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        userType: newUser.userType,
        isProfileComplete: false, // added to keep track of profile completion (picture, bio, interest, etc.)
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ! Route for Login
// ENDPOINT: http://localhost:4000/user/login
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

    // Create JWT token
    const token = jwt.sign({ id: user._id, userType: userType }, "secret", {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: `Welcome, ${user.firstName}. You have been successfuly logged in.`,
      token: token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: userType,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// TODO ROUTE TO UPDATE BASIC USER INFO (name, email, password, etc.) add the rest of profile info here

// ENDPOINT: http://localhost:4000/user/update/:id
// Request type: PUT
router.put("/update/:id", validateSession, async (req, res) => {
  try {
    //1. store id in a variable
    const id = req.params.id;

    //2. variable that will store user id
    const filter = { _id: id };

    // supply req.body only with fields that user should be able to update
    // dont let user change their userType
    const { firstName, lastName, email, password } = req.body;

    // Empty object to hold updated info
    const updatedInfo = {};

    // only update if provided values are NOT undefined
    if (firstName !== undefined) updatedInfo.firstName = firstName;
    if (lastName !== undefined) updatedInfo.lastName = lastName;
    if (email !== undefined) updatedInfo.email = email;
    if (password !== undefined) {
      updatedInfo.password = bcrypt.hashSync(password, 10);
    }
    // ToDo return the updated user info (if/else mentor/mentee)
    let updatedUser = null;
    if (req.userType === "Mentor") {
      updatedUser = await Mentor.findOneAndUpdate(
        filter,
        updatedInfo,
        { new: true } // Returns the updated info
      );
    } else {
      updatedUser = await Mentee.findOneAndUpdate(
        filter,
        updatedInfo,
        { new: true } // Returns the updated info
      );
    }

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
// ENDPOINT: http://localhost:4000/user/delete/:id
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
        //  else mentee successfull deletion
        return res.status(200).json({
          message: "Mentee successfully deleted from the database",
          deletedUser: "Mentee",
        });
      }
    } else {
      // else mentor successful deletion
      return res.status(200).json({
        message: "Mentor successfully deleted from the database",
        deletedUser: "Mentor",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ! route to view all mentors
// Endpoint:http: //localhost:4000/user/all-mentors
// request type: GET
router.get("/all-mentors", async (req, res) => {
  try {
    const mentors = await Mentor.find({ userType: "Mentor" });

    const formattedMentors = mentors.map((mentor) => ({
      id: mentor._id,
      firstName: mentor.firstName,
      lastName: mentor.lastName,
      email: mentor.email,
      bio: mentor.bio || "",
      interests: mentor.interests || "",
      questionToAsk: mentor.questionToAsk || "",
      profilePhoto: mentor.profilePhoto || "",
      projectCategory: mentor.projectCategory || "",
    }));

    res.status(200).json({
      message: `All mentors retrieved successfully`,
      mentors: formattedMentors,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// !Route for completing user profile information (separate from basic account register or update)
// Maddie changed this on her local to be "/mentor/update/:id"
// ENDPOINT: http://localhost:4000/user/completion/:id
// Request type: PUT
router.put("/completion/:id", validateSession, async (req, res) => {
  try {
    // Store id in variable
    const id = req.params.id;

    // Initialize variables
    let profileInfo = {};
    let isProfileComplete = true;

    // ! If user is mentor, update MENTOR specific profile fields
    if (req.userType === "Mentor") {
      // Extract mentor fields from req.body
      const { bio, profilePhoto, interests, questionToAsk, projectCategory } =
        req.body;

      profileInfo = {
        bio: bio || "",
        profilePhoto: profilePhoto || "",
        interests: interests || "",
        questionToAsk: questionToAsk || "",
        projectCategory: projectCategory || "",
      };

      // Check if all required fields are completed, if not set isProfileComplete = false
      if (
        !bio ||
        !profilePhoto ||
        !interests ||
        !questionToAsk ||
        !projectCategory
      ) {
        isProfileComplete = false;
      }

      // If mentee, update mentee specific profile fields
    } else if (req.userType === "Mentee") {
      const { age, interests, school, guardianEmail } = req.body;

      profileInfo = {
        age: age || null,
        interests: interests || "",
        school: school || "",
        guardianEmail: guardianEmail || "",
      };

      // Check if all required fields are completed, if not, set profileComplete = false
      if (!age || !interests || !school || !guardianEmail) {
        isProfileComplete = false;
      }
    }

    // Update user info based on user type (findByIdAndUpdate)
    const User = req.userType === "Mentor" ? Mentor : Mentee;
    const updatedUser = await User.findByIdAndUpdate(id, profileInfo, {
      new: true,
    });

    // if no user found, give error
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: `Profile successfully completed` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// TODO Route for photo upload
// ENDPOINT: http://localhost:4000/user/profile-photo/:id
// Request Type: PUT
router.put("/profile-photo/:id", validateSession, async (req, res) => {
  try {
    //1. store id in a variable
    const id = req.params.id;

    //  2. get image URL from req.body
    const { profilePhoto } = req.body;

    // Check that user is a mentor before updating
    if (req.userType !== "Mentor") {
      return res.status(403).json({
        message: "Only mentors need to upload a profile photo",
      });
    }
    // if no photo url is found, return error
    if (!profilePhoto) {
      return res
        .status(400)
        .json({ message: "Photo seems to be missing! Try again" });
    }

    // Update user info with profilePhoto (findByIdAndUpdate)
    const updatedMentor = await Mentor.findByIdAndUpdate(
      id,
      { profilePhoto: profilePhoto },
      { new: true }
    );

    // if no user found, give error
    if (!updatedMentor) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: `route works` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;

