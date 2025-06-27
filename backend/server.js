require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes"); 
const privateRoutes = require("./routes/privateRoutes");
const reportRoutes = require("./routes/reportRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const quizResultRoutes = require("./routes/quizResultRoutes");
const whmisSimpleRoutes = require("./routes/whmisSimpleRoutes");

connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/private", privateRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/quiz-results", quizResultRoutes);
app.use("/api/whmis-simple", whmisSimpleRoutes);



app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
