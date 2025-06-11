import React, { useState } from "react";
import { translateText } from "../utils/translate";

const TranslateDemo = () => {
  const [translated, setTranslated] = useState("");

  const handleTranslate = async () => {
    const result = await translateText("Always be happy.", "fr");
    setTranslated(result || "Translation failed");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Translation Test</h3>
      <button onClick={handleTranslate}>Translate to French</button>
      {translated && <p><strong>Translated:</strong> {translated}</p>}
    </div>
  );
};

export default TranslateDemo;

