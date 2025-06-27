const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// Puedes modificar esta ruta después, esto es solo para evitar el error
router.get("/", protect, (req, res) => {
  res.json({ message: "WHMIS simple route funcionando." });
});

module.exports = router;
