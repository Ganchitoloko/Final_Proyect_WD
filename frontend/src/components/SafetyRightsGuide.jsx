import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/SafetyRightsGuide.css";


const tips = [  
  "You have the right to know about hazards in your workplace.",
  "You have the right to participate in decisions affecting your health and safety.",
  "You have the right to refuse unsafe work without fear of retaliation.",
  "Your employer must provide proper training and supervision for your tasks.",
  "You must be given appropriate Personal Protective Equipment (PPE) for your work.",
  "You are entitled to report safety violations to WorkSafeBC or your local safety board.",
  "You have the right to access first aid and report any workplace injury.",
  "You are eligible for compensation if you are injured at work.",
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
      <h2 className="guide-title">Safety Rights</h2>

      <div className="language-selector">
        <label>Select Language: </label>
        <select onChange={(e) => setLanguage(e.target.value)} value={language}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="pt">Portuguese</option>
          <option value="fr">French</option>
          <option value="tl">Tagalog</option>
           <option value="hi">Hindi (Indian)</option>
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
