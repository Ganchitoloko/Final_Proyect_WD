import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api"; // Ajusta si usas otro puerto/backend

function ReportFormPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${API_BASE_URL}/reports`,
        { title, description, location, category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Reporte creado correctamente.");
      navigate("/reports");
    } catch (error) {
      console.error("Error creando el reporte:", error);
      alert("Error al crear el reporte.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Nuevo Reporte</h2>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border w-full p-2 mb-4 rounded"
        />

        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border w-full p-2 mb-4 rounded"
        ></textarea>

        <input
          type="text"
          placeholder="Ubicación"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="border w-full p-2 mb-4 rounded"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="border w-full p-2 mb-4 rounded"
        >
          <option value="">-- Selecciona una categoría --</option>
          <option value="Electrical">Electrical</option>
          <option value="Fall Hazard">Fall Hazard</option>
          <option value="Chemical">Chemical</option>
          <option value="Fire Risk">Fire Risk</option>
          <option value="Other">Other</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Crear Reporte
        </button>
      </form>
    </div>
  );
}

export default ReportFormPage;

