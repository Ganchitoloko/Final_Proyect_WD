import { useState } from "react";
import { useNavigate } from "react-router-dom";
import whmisQuestions from "../data/whmisQuestions";
import axios from "axios";

function WhmisQuizPage() {
  const [answers, setAnswers] = useState(Array(whmisQuestions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate(); // <-- necesario para redirección

  const handleChange = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    const total = whmisQuestions.length;
    const correct = whmisQuestions.reduce((acc, question, i) => {
      return acc + (question.correctAnswer === answers[i] ? 1 : 0);
    }, 0);

    const incorrect = total - correct;

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/quiz-results/submit",
        {
          total,
          correct,
          incorrect
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setResult({ total, correct, incorrect });
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting quiz:", err);
      alert("Error submitting quiz.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-6">WHMIS Quiz</h1>

      {/* ✅ Botón para ir al historial */}
      <button
        onClick={() => navigate("/my-whmis-results")}
        className="bg-green-600 text-white px-3 py-2 rounded mb-4 hover:bg-green-700"
      >
        View My Results
      </button>

      {whmisQuestions.map((q, i) => (
        <div key={i} className="mb-6">
          <p className="font-medium">{i + 1}. {q.question}</p>
          <div className="space-y-2 mt-2">
            {q.options.map((option, j) => (
              <label key={j} className="block">
                <input
                  type="radio"
                  name={`question-${i}`}
                  value={j}
                  checked={answers[i] === j}
                  onChange={() => handleChange(i, j)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Quiz
        </button>
      ) : (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Results:</h2>
          <p>Total Questions: {result.total}</p>
          <p>Correct: {result.correct}</p>
          <p>Incorrect: {result.incorrect}</p>
        </div>
      )}
    </div>
  );
}

export default WhmisQuizPage;
