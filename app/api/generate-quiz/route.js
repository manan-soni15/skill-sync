import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { subject } = await req.json();

  const prompt = `
  You are a quiz generator.
  Create a quiz on the subject: "${subject}".
  The quiz must contain exactly 12 questions:
  - 3 Easy
  - 3 Medium
  - 3 Hard
  - 3 Extreme
  Mix of multiple choice (4 options) and True/False.
  
  Return ONLY a valid JSON array. No explanation, no text outside JSON.
  Format:
  [
    {
      "question": "What is ...?",
      "difficulty": "Easy",
      "options": ["A", "B", "C", "D"],
      "answer": "B"
    },
    {
      "question": "True or False: ...",
      "difficulty": "Medium",
      "options": ["True", "False"],
      "answer": "True"
    }
  ]
  `;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  let quiz;
  try {
    let content = response.choices[0].message.content.trim();
    content = content.replace(/```json|```/g, "").trim();
    quiz = JSON.parse(content);
  } catch (err) {
    console.error("Error parsing quiz:", err);
    quiz = [
      {
        question: "Fallback: What is 2+2?",
        difficulty: "Easy",
        options: ["2", "3", "4", "5"],
        answer: "4",
      },
    ];
  }

  return NextResponse.json({ quiz });
}
