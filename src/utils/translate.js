import axios from "axios";

const API_KEY = "AIzaSyBKsJVuII_7bP_3s99Le34gLuwzC8XrG-A"; 

export const translateText = async (text, targetLang = "es") => {
  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        q: text,
        target: targetLang,
        format: "text",
      }
    );

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return null;
  }
};

    