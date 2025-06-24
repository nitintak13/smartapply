import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
import pdfParse from "pdf-parse";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import redis from "../config/redis.js";

function extractScore(text) {
  const match = text.match(/(\d{1,3})/);
  return match ? parseInt(match[1]) : 0;
}
async function fetchResumeText(url) {
  const res = await axios.get(url);
  return res.data.toString().slice(0, 4000); // max 4k to stay under token limit
}
// Get User Data
export const getUserData = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth.userId;

  try {
    // Check if already applied
    const isAlreadyApplied = await JobApplication.findOne({ jobId, userId });
    if (isAlreadyApplied) {
      return res.json({ success: false, message: "Already Applied" });
    }

    // Get Job + User Data
    const job = await Job.findById(jobId);
    const user = await User.findById(userId);

    if (!job || !user) {
      return res.json({ success: false, message: "Job/User Not Found" });
    }

    // ✨ Gemini Prompt
    const prompt = `
You are a job matching assistant. 
Given the resume text and a job description, return a match score out of 100 — followed by improvement suggestions if needed.

Resume:
${user.resumeText}

Job Description:
${job.description}

Respond in format: 
Match Score: XX
Suggestions: ...
    `;

    // 🎯 Get Score from Gemini
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const match = text.match(/Match Score: (\d+)/);
    const score = match ? parseInt(match[1]) : 0;

    // ❌ If score < 60, reject
    if (score < 60) {
      return res.json({
        success: false,
        message: `Application rejected due to low resume match score (${score}/100). Please improve and try again.`,
      });
    }

    // ✅ Save Application
    await JobApplication.create({
      companyId: job.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    // 🧠 Save score to Redis ZSET
    await redis.zAdd(`job:${jobId}:applications`, {
      score,
      value: `user:${userId}`,
    });

    res.json({
      success: true,
      message: "Applied Successfully",
      matchScore: score,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// Get User Applied Applications Data
export const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    if (!applications) {
      return res.json({
        success: false,
        message: "No job applications found for this user.",
      });
    }

    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update User Resume
export const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const resumeFile = req.file;

    const userData = await User.findById(userId);

    if (resumeFile) {
      // 1. Upload to Cloudinary
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
      userData.resume = resumeUpload.secure_url;

      // 2. Read and parse file buffer
      const fileBuffer = fs.readFileSync(resumeFile.path);
      const pdfData = await pdfParse(fileBuffer);
      const plainText = pdfData.text;

      // 3. Store plain text in DB
      userData.resumeText = plainText;
    }

    await userData.save();
    return res.json({ success: true, message: "Resume Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
