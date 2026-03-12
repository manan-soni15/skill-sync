import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  const { answers } = await req.json();

  // If less than 3 answers, keep asking questions
  const questions = [
    "What subject or topic excites you the most?",
    "Do you enjoy working with numbers, people, or technology more?",
    "Would you prefer a creative career, analytical role, or leadership path?",
  ];

  if (answers.length < questions.length) {
    return NextResponse.json({ nextQuestion: questions[answers.length] });
  }

  // If quiz is done, ask OpenAI for analysis
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a career guidance mentor. Analyze the user's answers and suggest career areas and skills they should develop.",
      },
      {
        role: "user",
        content: `User's answers: ${answers.join(", ")}`,
      },
    ],
  });

  const result = completion.choices[0].message.content;

  return NextResponse.json({ result });
}
