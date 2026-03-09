// routes/assistant.js
import express from "express";
import cohere from "../models/cohere.js";

const router = express.Router();

router.post("/assistant", async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    // Cohere Chat API call
    const response = await cohere.chat({
      model: "command-r7b-12-2024", // pick a model you have access to
      message: `You are a helpful assistant for a to-do app.\nUser: ${message}\nAssistant:`,
      max_tokens: 150,
      temperature: 0.7,
    });

    // The assistant's reply
    const reply = response.message || "Sorry, I couldn't generate a response.";
    res.json({ reply });
  } catch (err) {
    console.error("Cohere Chat API error:", err);
    res.status(500).json({ error: "Cohere Chat API error" });
  }
});

export default router;
