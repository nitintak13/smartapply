# 🚀 SmartApply – AI-Powered Job Application System

**SmartApply** is a full-stack MERN application that redefines how candidates apply for jobs. It uses **Google Gemini AI + Redis + MongoDB** to deliver **instant resume scoring, cooldowns, rate limiting, and recruiter-focused applicant ranking** — all designed with **real-world product thinking**.

---

## 🔥 Features

### 🧑‍💼 Applicant Features

- ✅ **One-Click Job Apply**

  - Apply instantly with feedback from Gemini AI.
  - Returns: `Match Score`, `Missing Skills`, and personalized `Advice`.

- 📄 **AI Resume–JD Matching**

  - Compares your resume to the job description.
  - Gemini generates detailed suggestions to improve your resume.

- 🧊 **Cooldown System (Redis TTL)**

  - If your fit score is **below 60**, a **5-hour cooldown** is activated.
  - Prevents repeated low-fit attempts with the same resume.

- ⚡ **Fast Rechecks with Redis**

  - If you're in cooldown and click “Apply”, the response is **instantly returned from Redis cache** — no LLM/API hit.

- 📛 **Resume Upload + Parsing**

  - Upload a resume (PDF) → Parsed using `pdf-parse` → Text stored for AI.
  - Resume updates automatically **clear old cache & cooldown** in Redis.

- 🚫 **Rate Limiting**

  - Max **5 total apply attempts per hour** (click-based).
  - Max **5 successful applications per hour**.

- 📂 **Track Your Applications**
  - View all jobs you've applied to, match scores, advice, and statuses.

---

### 🧠 Recruiter Features (backend ready)

- 🧠 **Candidate Ranking via Redis Sorted Sets**

  - All applicants are stored in `job:<jobId>:applications` with `matchScore` as score.
  - Enables real-time **ranking of top candidates per job**.

- 🔍 **Job-Specific Filtering**
  - Recruiters can view only applicants for a specific job, sorted by score.

---

## 🧠 Product Thinking Behind SmartApply

| Problem                        | Solution                                        |
| ------------------------------ | ----------------------------------------------- |
| Users spam apply to all jobs   | ✅ Cooldown and rate limit                      |
| LLM calls are expensive        | 🔁 Redis caching for score + advice             |
| Recruiter screening takes time | 📊 Real-time applicant ranking                  |
| No resume feedback             | 💡 AI-generated improvement advice              |
| Same resume reused             | 🧹 Resume update clears all cache automatically |

---

## 🛠️ Tech Stack

| Layer       | Tech                                |
| ----------- | ----------------------------------- |
| Frontend    | React, Tailwind, Axios, Clerk       |
| Backend     | Node.js, Express.js                 |
| AI/LLM      | Google Gemini (via `@google/genai`) |
| Database    | MongoDB + Mongoose                  |
| Cache       | Redis (cooldowns, sorted sets)      |
| Auth        | Clerk.dev                           |
| File Upload | Cloudinary + pdf-parse              |
