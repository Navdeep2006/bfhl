import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const askAI = async (question) => {
  try {
  // Validate input
  if (typeof question !== "string" || question.trim() === "") {
    const err = new Error("Invalid AI input");
    err.status = 400;
    throw err;
  }

  // Validate key
  if (!GEMINI_API_KEY) {
    const err = new Error("AI service unavailable");
    err.status = 500;
    throw err;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [{ text: `${question} (Answer in one word only)` }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const candidates = response?.data?.candidates;

    if (!candidates || candidates.length === 0 || !candidates[0]?.content?.parts?.[0]?.text) {
      const err = new Error("AI returned no content");
      err.status = 502;
      throw err;
    }

    const text = candidates[0].content.parts[0].text;

    const result = text.trim().split(/\s+/)[0].replace(/[^a-zA-Z]/g, "");

    return result || "Unavailable";
  } catch (error) {
    console.error("Gemini AI Error:", error.response?.data || error.message);
    return "Unavailable";
  }
};