import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import app from "../firebase/firebaseConfig";

const db = getFirestore(app);

const ReportList = () => {
  const [hazards, setHazards] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "hazards"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setHazards(items);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Submitted Hazard Reports</h2>
      {hazards.length === 0 ? (
        <p>No reports yet.</p>
      ) : (
        hazards.map((hazard) => (
          <div
            key={hazard.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h3>{hazard.title}</h3>
            <p>{hazard.description}</p>
            {hazard.imageURL && (
              <img
                src={hazard.imageURL}
                alt="Hazard"
                style={{ width: "100%", maxWidth: "400px", height: "auto", borderRadius: "5px" }}
              />
            )}
            {hazard.createdAt?.toDate && (
              <p style={{ fontSize: "12px", color: "gray" }}>
                Reported on: {hazard.createdAt.toDate().toLocaleString()}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReportList;
