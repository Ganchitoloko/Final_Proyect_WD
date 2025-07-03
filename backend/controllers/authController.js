const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register user
const registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: role || "worker", // Default is 'worker'
    });

    res.status(201).json({ message: "User successfully registered." });
  } catch (error) {
    res.status(500).json({ message: "Error registering user.", error: error.message });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: "Incorrect password." });

    // Include role in the token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Optionally return role separately in the response
    res.json({
      token,
      role: user.role, // 👈 Useful if frontend wants to read it without decoding
      message: "Login successful.",
    });
  } catch (error) {
    res.status(500).json({ message: "Error during login.", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
