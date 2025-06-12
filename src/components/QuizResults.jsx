import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import app from "../firebase/firebaseConfig";

const db = getFirestore(app);
const auth = getAuth(app);

function QuizResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const user = auth.currentUser;

      if (!user) {
        console.warn("User not logged in.");
        return;
      }

      const q = query(
        collection(db, "quizResults"),
        where("userId", "==", user.uid),
        orderBy("submittedAt", "desc")
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setResults(data);
    };

    fetchResults();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Past Quiz Results</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map(result => (
            <li key={result.id}>
              Score: {result.score}/{result.total} – Date:{" "}
              {result.submittedAt?.toDate().toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuizResults;
