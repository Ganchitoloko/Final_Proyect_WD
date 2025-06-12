import React, { useState } from "react";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import app from "../firebase/firebaseConfig";

const db = getFirestore(app);

const quizQuestions = [
  {
    question: "What does WHMIS stand for?",
    options: ["Workplace Hazardous Materials Information System", "Work Health Management and Information Safety", "World Hazard Management Information System"],
    correctAnswer: 0,
  },
  {
    question: "Which symbol represents a flammable hazard?",
    options: ["Flame", "Skull and Crossbones", "Biohazard"],
    correctAnswer: 0,
  },
];

const Quiz = () => {
  const [answers, setAnswers] = useState(Array(quizQuestions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const handleOptionChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = parseInt(value);
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    let calculatedScore = 0;

    quizQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setSubmitted(true);

    try {
      await addDoc(collection(db, "quizResults"), {
        answers,
        score: calculatedScore,
        total: quizQuestions.length,
        submittedAt: Timestamp.now(),
      });

      alert(" Quiz submitted and saved!");
    } catch (error) {
      console.error(" Error saving quiz:", error);
      alert("Failed to save quiz result.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h2>WHMIS Quiz</h2>
      {quizQuestions.map((q, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <strong>{i + 1}. {q.question}</strong>
          {q.options.map((opt, j) => (
            <div key={j}>
              <label>
                <input
                  type="radio"
                  name={`question-${i}`}
                  value={j}
                  checked={answers[i] === j}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                  disabled={submitted}
                />{" "}
                {opt}
              </label>
            </div>
          ))}
        </div>
      ))}
      {!submitted ? (
        <button onClick={handleSubmit}>Submit Quiz</button>
      ) : (
        <h3>Your Score: {score}/{quizQuestions.length}</h3>
      )}
    </div>
  );
};

export default Quiz;

