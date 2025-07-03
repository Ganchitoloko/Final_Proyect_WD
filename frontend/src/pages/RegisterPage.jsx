// RegisterPage.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AuthForm.css";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("worker");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
        role
      });
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>📝 Register</h1>
        <form onSubmit={handleRegister}>
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
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="worker">Worker</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">✅ Register</button>
        </form>
        <p>
          Already have an account? <span className="link" onClick={() => navigate("/login")}>Login here</span>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;