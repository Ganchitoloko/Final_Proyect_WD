const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registrar usuario
const registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: "El usuario ya existe." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: role || "worker", // Por defecto es 'worker'
    });

    res.status(201).json({ message: "Usuario registrado correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario.", error: error.message });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado." });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: "Contraseña incorrecta." });

    // Incluir el rol en el token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // También lo devolvemos por separado en la respuesta (opcional)
    res.json({
      token,
      role: user.role, // 👈 Útil si el frontend quiere leerlo sin decodificar
      message: "Login exitoso.",
    });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión.", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
