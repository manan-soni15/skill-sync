import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { skills, interests, goals } = body;

    const prompt = `
    Create a personalized career roadmap.
    Skills: ${skills?.join(", ") || "None"}
    Interests: ${interests || "General"}
    Career Goal: ${goals || "Not specified"}

    The roadmap should be step-by-step, practical, and divided into:
    - Short-term goals (0-6 months)
    - Mid-term goals (6-18 months)
    - Long-term goals (2+ years)
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const roadmap = completion.choices[0].message.content;

    return new Response(JSON.stringify({ roadmap }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
