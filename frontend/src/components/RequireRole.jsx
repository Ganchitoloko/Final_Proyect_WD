import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as jwtDecode from "jwt-decode"; // ✅ Importación correcta

function RequireRole({ role, children }) {
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // ✅ Decodifica correctamente el token
      const decoded = jwtDecode.jwtDecode(token);
      if (decoded.role === role) {
        setAuthorized(true);
      } else {
        navigate("/login"); // Acceso denegado si el rol no coincide
      }
    } catch (err) {
      console.error("Token inválido:", err);
      navigate("/login");
    }
  }, [navigate, role]);

  return authorized ? children : null;
}

export default RequireRole;
