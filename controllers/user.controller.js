const router = require("express").Router();
const validateSession = require("../middleware/validate-session");
//  Import user model
const User = require("../models/user.model")
// import bcrypt for password hashing
const bcrypt = require("bcrypt");
// import jsonwebtoken for creating a token
const jwt = require("jsonwebtoken");

// TODO Admin routes?
// TODO do not allow users to edit their "role"
// TODO Get all users by role

// !Signup Route
// Endpoint: "localhost:4000/user/register"
// Request Type: POST
router.post("/register", async (req, res) => {
  try {
    // Destructure the request body
    const { firstName, lastName, email, password, role } = req.body;

      // Check if role is provided
      if (!role) {
        return res.status(400).json({ message: "Role is required" });
      }
    // Create variable and use the User model to create a new user
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: bcrypt.hashSync(password, 10), //hashing the password
      role: role,
    });

    //  Save the new user in the database and store the response in a variable
    const newUser = await user.save();

    // 5. Create a JWT token - three parameters - (what you want stored, secret_word, options such as expiring)
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, "secret", {
      expiresIn: "7d",
    });

    res
      .status(201)
      .json({
        message: `User Created Successfully!`,
        user: newUser,
        token: token,
      });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// !Route for Login
// Endpoint: "http://localhost:4000/user/login"
// Request Type: POST
router.post("/login", async (req, res) => {
  try {
    // Destructure
    const { email, password } = req.body;

    //  Check the database to see if the user email exists
    const user = await User.findOne({ email: email });

    //  If user doesn't exist, throw error
    if (!user) {
      throw new Error("User not found");
    }

    // Check/compare provided password
    const isValidPassowrd = bcrypt.compareSync(password, user.password);

    // Throw error if password does not match
    if (!isValidPassowrd) {
      throw new Error("Password is not a match");
    }

    // Create JWT tokem
    const token = jwt.sign({ id: user._id, role: user.role }, "secret", {
      expiresIn: "7d",
    });

    // update res.json with token
    res.json({ message: `Login successful!`, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update USer Route
// Endpoint: http://localhost:4000/user/update/:id
// Type: PUT
// TODO make sure user can't change role during update
router.put("/update/:id", validateSession, async (req, res) => {
  try {
    //1. store id in a variable
    const id = req.params.id;

    //2. variable that will store user id
    const filter = { _id: id };

    //3. variable to store req.body
    const data = req.body;

    //4. update options: create variable called options
    const options = { new: true };

    const user = await User.findOneAndUpdate(filter, data, options);

    // update res.json with user info
    res.json({ message: `User updated successfully!`, user: user });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Delete User Route
// Endpoint: http://localhost:4000/user/delete/:id
// Request Type: DELETE
router.delete('/delete/:id', validateSession, async (req, res) => {
try{
   //1.
    //using model method of deleteOne()/ seeing id show up through url
    const user = await User.deleteOne({
      //supplying id
      _id: req.params.id,
    });

res.json({ message: `User deleted successfully` });
} catch (error) {
res.json({ message: error.message });
}
})

module.exports = router;
