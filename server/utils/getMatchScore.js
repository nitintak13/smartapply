// utils/matchScore.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getMatchScore = async (resumeText, jobText) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are an AI resume screener. Given a candidate's resume and a job description, output:

1. A match score between 0 and 100 based on how relevant the resume is for the job.
2. A short explanation of key matching and missing points.

Resume:
${resumeText}

Job Description:
${jobText}
`;

    const result = await model.generateContent(prompt);
    const output = await result.response.text();

    // Extract score using regex
    const scoreMatch = output.match(/(\d{1,3})/);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;

    return { score, explanation: output };
  } catch (error) {
    console.error("Gemini Match Error:", error);
    return { score: 0, explanation: "Could not calculate score" };
  }
};
