import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditReportPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://localhost:5000/api/reports/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTitle(res.data.title);
        setDescription(res.data.description);
      } catch (error) {
        console.error("Error cargando el reporte:", error);
        alert("No se pudo cargar el reporte.");
      }
    };

    fetchReport();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/reports/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Reporte actualizado correctamente.");
      navigate("/reports");
    } catch (error) {
      console.error("Error actualizando el reporte:", error);
      alert("No se pudo actualizar el reporte.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Editar Reporte</h2>

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

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
        >
          Actualizar Reporte
        </button>
      </form>
    </div>
  );
}

export default EditReportPage;
