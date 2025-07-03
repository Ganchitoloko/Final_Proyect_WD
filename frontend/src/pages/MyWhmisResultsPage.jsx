import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/MyWhmisResultsPage.css";

function MyWhmisResultsPage() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get("http://localhost:5000/api/quiz-results/my-results", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const sorted = res.data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setResults(sorted);
      } catch (err) {
        console.error("Error fetching results:", err);
        alert("Could not load your WHMIS quiz results.");
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="whmis-results-container">
      <h1 className="results-title">My WHMIS Quiz Results</h1>
      {results.length === 0 ? (
        <p className="no-results">You haven't completed any WHMIS quizzes yet.</p>
      ) : (
        <table className="results-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Correct</th>
              <th>Incorrect</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res, i) => (
              <tr key={i}>
                <td>{new Date(res.date).toLocaleString()}</td>
                <td className="correct">{res.correct}</td>
                <td className="incorrect">{res.incorrect}</td>
                <td>{res.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            backgroundColor: "#facc15",
            color: "#0f172a",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ⬅️ Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default MyWhmisResultsPage;
