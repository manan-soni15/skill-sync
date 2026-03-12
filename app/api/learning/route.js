import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Subjects supported by Microsoft Learn
const MICROSOFT_LEARN_SUBJECTS = [
  "html",
  "css",
  "javascript",
  "python",
];

const normalize = (value) =>
  value.toLowerCase().trim();

export async function POST(req) {
  try {
    const { subject } = await req.json();

    if (!subject || !subject.trim()) {
      return NextResponse.json(
        { error: "Subject is required" },
        { status: 400 }
      );
    }

    const normalizedSubject = normalize(subject);
    const isMicrosoftLearn =
      MICROSOFT_LEARN_SUBJECTS.includes(normalizedSubject);

    const prompt = isMicrosoftLearn
      ? `
You are a curriculum planner.

Create a structured learning roadmap for "${subject}".

Divide the subject into EXACTLY two levels:
Beginner and Advanced.

For EACH level:
- Include 4–6 topics
- For EACH topic provide:
  - "title"
  - "estimated_time"

IMPORTANT:
- Do NOT include explanations
- Do NOT include resources
- Output ONLY valid JSON
- No extra text outside JSON

JSON FORMAT:

{
  "learning": [
    {
      "title": "Beginner",
      "topics": [
        {
          "title": "Topic Name",
          "estimated_time": "2–4 hours"
        }
      ]
    },
    {
      "title": "Advanced",
      "topics": [...]
    }
  ]
}
`
      : `
You are a curriculum planner and teacher.

Create a structured learning roadmap for the subject "${subject}".

Divide the subject into EXACTLY four levels:
Beginner, Intermediate, Advanced, Expert.

For EACH level:
- Include 4–6 topics
- For EACH topic provide:
  - "title"
  - "detailed_explanation": 2–4 concise sentences
  - "resources": 1–2 generic learning references
  - "estimated_time": realistic study time

IMPORTANT RULES:
- Keep explanations simple and beginner-friendly
- Do NOT invent highly specific paid courses
- Output ONLY valid JSON
- No text outside JSON

JSON FORMAT:

{
  "learning": [
    {
      "title": "Beginner",
      "topics": [
        {
          "title": "Topic Name",
          "detailed_explanation": "2–4 sentences.",
          "resources": ["https://example.com"],
          "estimated_time": "2–4 hours"
        }
      ]
    },
    { "title": "Intermediate", "topics": [...] },
    { "title": "Advanced", "topics": [...] },
    { "title": "Expert", "topics": [...] }
  ]
}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 3500,
    });

    const raw = completion.choices?.[0]?.message?.content?.trim();
    if (!raw) throw new Error("Empty response from OpenAI");

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("No valid JSON found");
      parsed = JSON.parse(match[0]);
    }

    const learning = parsed?.learning ?? parsed;

    if (!Array.isArray(learning)) {
      return NextResponse.json(
        { error: "No roadmap produced. Try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      learning,
      source: isMicrosoftLearn ? "microsoft" : "ai",
    });
  } catch (err) {
    console.error("❌ Error in /api/learning:", err);
    return NextResponse.json(
      { error: err.message || "Failed to generate explanation." },
      { status: 500 }
    );
  }
}
