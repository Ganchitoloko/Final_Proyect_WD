import { useEffect, useState } from "react";
import axios from "axios";

function MyWhmisResultsPage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get("http://localhost:5000/api/quiz-results/my-results", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching results:", err);
        alert("Could not load your WHMIS quiz results.");
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-6">My WHMIS Quiz Results</h1>
      {results.length === 0 ? (
        <p>You haven't completed any WHMIS quizzes yet.</p>
      ) : (
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Correct</th>
              <th className="border px-4 py-2">Incorrect</th>
              <th className="border px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res, i) => (
              <tr key={i} className="text-center">
                <td className="border px-4 py-2">{res.date? new Date(res.date).toLocaleString("en-US", {year: "numeric",month: "long",day: "numeric",hour: "2-digit",minute: "2-digit",}): "Unknown"}</td>
                <td className="border px-4 py-2">{res.correct}</td>
                <td className="border px-4 py-2">{res.incorrect}</td>
                <td className="border px-4 py-2">{res.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyWhmisResultsPage;
