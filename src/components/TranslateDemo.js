import React, { useState } from "react";
import axios from "axios";

const TranslateDemo = () => {
  const [text, setText] = useState("This is a safety hazard.");
  const [translated, setTranslated] = useState("");
  const [targetLang, setTargetLang] = useState("es");

  const handleTranslate = async () => {
    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2`,
        {},
        {
          params: {
            q: text,
            target: targetLang,
            key: process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY,
          },
        }
      );

      const translatedText = response.data.data.translations[0].translatedText;
      setTranslated(translatedText);
    } catch (error) {
      console.error("Translation error:", error);
      alert("Translation failed.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Translate Text</h2>
      <textarea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} style={{ marginBottom: "10px" }}>
        <option value="es">Spanish</option>
        <option value="pt">Portuguese</option>
        <option value="fr">French</option>
        <option value="hi">Hindi</option>
        <option value="tl">Tagalog</option>
      </select>
      <br />
      <button onClick={handleTranslate} style={{ marginBottom: "10px" }}>
        Translate
      </button>
      <div>
        <strong>Translated:</strong>
        <p>{translated}</p>
      </div>
    </div>
  );
};

export default TranslateDemo;

