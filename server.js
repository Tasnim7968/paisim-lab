import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/api/recommend", async (req, res) => {
  try {
    const { experiments } = req.body;

    const prompt = `
You are a senior data scientist at an early-stage AI company.

Analyze these customer simulation experiments:
${JSON.stringify(experiments, null, 2)}

Write a short recommendation memo with:
1. Best configuration
2. Why it performed best
3. Risks or limitations
4. Next experiment to run

Keep it professional and clear for a founding team.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    res.json({ memo: response.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "AI recommendation failed. Check your API key or free-tier limits.",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});