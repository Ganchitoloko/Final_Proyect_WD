import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/SafetyRightsGuide.css";


const tips = [
  "Always wear helmets, gloves, boots, and reflective vests when on site.",
  "Report any unsafe conditions to your supervisor immediately.",
  "Follow lockout/tagout procedures before servicing equipment.",
  "Use ladders properly and ensure they are secured.",
  "Keep your work area clean to avoid slips and trips.",
];

function SafetyRightsGuide() {
  const [language, setLanguage] = useState("en");
  const [translatedTips, setTranslatedTips] = useState(tips);

 useEffect(() => {
  const translateTips = async () => {
    if (language === "en") {
      setTranslatedTips(tips);
      return;
    }

    try {
      const translations = await Promise.all(
        tips.map(async (tip) => {
          const res = await axios.post("http://localhost:5000/api/translate", {
            text: tip,
            targetLang: language,
          });

          return res.data.translatedText;
        })
      );

      setTranslatedTips(translations);
    } catch (error) {
      console.error("Translation failed:", error);
    }
  };

  translateTips();
}, [language]);

  return (
    <div className="safety-guide-container">
      <h2 className="guide-title">Safety Rights & Tips</h2>

      <div className="language-selector">
        <label>Select Language: </label>
        <select onChange={(e) => setLanguage(e.target.value)} value={language}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="pt">Portuguese</option>
          <option value="fr">French</option>
          <option value="tl">Tagalog</option>
        </select>
      </div>

      <ul className="tips-list">
        {translatedTips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}

export default SafetyRightsGuide;
