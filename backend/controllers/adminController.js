const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // without password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await user.deleteOne(); // delete user

    res.json({ message: "User successfully deleted." });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ message: "Server error while deleting user." });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};
