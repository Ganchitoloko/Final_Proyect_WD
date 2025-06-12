import React, { useState } from "react";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import app from "../firebase/firebaseConfig";

const db = getFirestore(app);

const ReportForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fakeImageURL = "https://placehold.co/400x300?text=Hazard+Image";

      await addDoc(collection(db, "hazards"), {
        title,
        description,
        imageURL: fakeImageURL,
        createdAt: Timestamp.now()
      });

      alert("Hazard reported (image simulated).");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding hazard:", error);
      alert("Failed to report hazard.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Report a Hazard</h2>
      <input
        type="text"
        placeholder="Hazard Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <textarea
        placeholder="Hazard Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        rows={4}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <button type="submit" style={{ padding: "8px 16px" }}>
        Submit
      </button>
    </form>
  );
};

export default ReportForm;

