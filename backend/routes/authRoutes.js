const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Ruta para registrar un usuario
router.post("/register", registerUser);

// Ruta para hacer login
router.post("/login", loginUser);

module.exports = router;
