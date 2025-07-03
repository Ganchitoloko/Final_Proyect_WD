import { useState } from "react";
import { useNavigate } from "react-router-dom";
import whmisQuestions from "../data/whmisQuestions";
import axios from "axios";
import "../styles/WhmisQuizPage.css"; 

function WhmisQuizPage() {
  const [answers, setAnswers] = useState(Array(whmisQuestions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

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
        { total, correct, incorrect },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult({ total, correct, incorrect });
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting quiz:", err);
      alert("Error submitting quiz.");
    }
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">WHMIS Quiz</h1>

      <button className="view-results-btn" onClick={() => navigate("/my-whmis-results")}>
        View My Results
      </button>

      {whmisQuestions.map((q, i) => {
  const isCorrect = submitted && answers[i] === q.correctAnswer;
  const isIncorrect = submitted && answers[i] !== q.correctAnswer;

  return (
    <div
      key={i}
      className={`quiz-question ${isCorrect ? "correct-answer" : ""} ${isIncorrect ? "incorrect-answer" : ""}`}
    >
      <p className="question-text">{i + 1}. {q.question}</p>
      <div className="options-list">
        {q.options.map((option, j) => {
          const isUserAnswer = answers[i] === j;
          const isRightAnswer = q.correctAnswer === j;

          return (
            <label
              key={j}
              className={`option-item ${
                submitted && isRightAnswer ? "highlight-correct-option" : ""
              }`}
            >
              <input
                type="radio"
                name={`question-${i}`}
                value={j}
                checked={isUserAnswer}
                onChange={() => handleChange(i, j)}
                disabled={submitted}
              />
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
})}


      {!submitted ? (
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Quiz
        </button>
      ) : (
        <div className="result-box">
  <h2>Results:</h2>
  <p>Total Questions: {result.total}</p>
  <p className="result-correct">✅ Correct: {result.correct}</p>
  <p className="result-incorrect">❌ Incorrect: {result.incorrect}</p>
</div>
      )}
    </div>
  );
}

export default WhmisQuizPage;
