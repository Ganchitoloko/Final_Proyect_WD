import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f172a] text-white px-4">
      <div className="bg-[#1e293b] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#facc15] mb-6 text-center">
          👷 SiteBuddy Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-[#facc15]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-[#0f172a] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#facc15]"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-[#facc15]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-[#0f172a] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#facc15]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#facc15] hover:bg-yellow-400 text-black font-semibold py-2 rounded transition duration-300"
          >
            🔐 Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#facc15] hover:underline cursor-pointer"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
