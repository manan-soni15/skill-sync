import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",  // lightweight but powerful
      messages: [
        { role: "system", content: "You are an AI mentor that provides career guidance to students. Be helpful, motivational, and give practical advice." },
        ...messages,
      ],
      max_tokens: 300,
    });
  
    return NextResponse.json({ 
      reply: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
