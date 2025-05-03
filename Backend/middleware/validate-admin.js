const Admin = require("../models/admin.model");

const validateAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "You must be logged in as an admin" });
    }
    //  Ensrue userType is Admin
    if (req.userType !== "Admin") {
      return res.status(403).json({ message: "You must have admin privelages to access this" });
    }
    // Verify that the user exists as an admin
    const isAdmin = await Admin.findById(req.user._id);

    if (!isAdmin) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    console.log("Admin user validation successful");
    return next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = validateAdmin;
