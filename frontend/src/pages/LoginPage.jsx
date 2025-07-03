import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as jwtDecode from "jwt-decode"; // ✅ Import correcto

import "../styles/AuthForm.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      // ✅ Decodificar token correctamente
      const decoded = jwtDecode.jwtDecode(token);
      const role = decoded.role;
      localStorage.setItem("role", role); // Guarda el rol si lo necesitas más adelante

      alert("Login successful!");

      // ✅ Redirigir según el rol
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>👷 SiteBuddy Login</h1>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">🔐 Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <span className="link" onClick={() => navigate("/register")}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
