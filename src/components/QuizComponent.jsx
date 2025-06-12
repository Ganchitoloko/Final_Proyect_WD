import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from "../firebase/firebaseConfig";

const db = getFirestore(app);
const auth = getAuth(app);

function QuizComponent() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const snapshot = await getDocs(collection(db, "quizzes"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  const handleChange = (questionId, selectedIndex) => {
    setAnswers({ ...answers, [questionId]: selectedIndex });
  };

  const handleSubmit = async () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctIndex) correct++;
    });

    const result = {
      userId: auth.currentUser?.uid || "anonymous",
      score: correct,
      total: questions.length,
      submittedAt: Timestamp.now()
    };

    await addDoc(collection(db, "quizResults"), result);

    setScore(correct);
    setSubmitted(true);
  };

  if (submitted) {
    return <h2>You scored {score} out of {questions.length}</h2>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>WHMIS Quiz</h2>
      {questions.map(q => (
        <div key={q.id} style={{ marginBottom: 20 }}>
          <p>{q.question}</p>
          {q.options.map((opt, index) => (
            <label key={index}>
              <input
                type="radio"
                name={q.id}
                value={index}
                checked={answers[q.id] === index}
                onChange={() => handleChange(q.id, index)}
              />
              {opt}
              <br />
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Answers</button>
    </div>
  );
}

export default QuizComponent;
