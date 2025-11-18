import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openrouter/sherlock-think-alpha",
        messages: [
          {
            role: "system",
            content: `
You are the AI assistant of the college management system.

Help students navigate:
- /student/dashboard
- /student/assignments
- /student/attendance
- /student/grades
- /student/profile
- /student/ai

If user says "go to attendance", reply:
NAVIGATE:/student/attendance
`
          },
          { role: "user", content: message }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // Send back the AI's reply
    res.json({ reply: response.data.choices[0].message.content });

  } catch (err) {
    console.log("AI ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "AI server error" });
  }
});

export default router;
