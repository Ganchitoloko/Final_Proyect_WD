const express = require("express");
const { getAllUsers, deleteUser } = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router(); // Esto DEBE ir antes de usar `router`

// Obtener todos los usuarios
router.get("/users", protect, adminOnly, getAllUsers);

// Eliminar usuario
router.delete("/users/:id", protect, adminOnly, deleteUser);

module.exports = router;
