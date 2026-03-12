import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getRecommendedVideo(topic) {
  try {
    const prompt = `
    Recommend one highly recommended and most liked video for learning ${topic} the video should be recent and most loved.
    Return only a valid YouTube video link in the past 3 years. Example format:
    https://www.youtube.com/watch?v=xxxxxxx
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const text = completion.choices[0].message.content.trim();
    return text.startsWith("http") ? text : null;
  } catch (err) {
    console.error("❌ Error fetching video from OpenAI:", err);
    return null;
  }
}

const sampleCourses = async (topic) => {
  const mainVideo = await getRecommendedVideo(topic);

  return [
    {
      title: `${topic} Course Recommendations`,
      description: `Curated resources to help you master ${topic}.`,
      mainVideo: mainVideo || null,
      coursera: `https://www.coursera.org/search?query=${encodeURIComponent(topic)}`,
      others: [
        `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + " tutorial")}`,
        `https://www.udemy.com/courses/search/?q=${encodeURIComponent(topic)}`,
        `https://github.com/search?q=${encodeURIComponent(topic + " projects")}`,
      ],
    },
  ];
};

export async function POST(req) {
  try {
    const { topic } = await req.json();
    if (!topic || !topic.toString().trim()) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const courses = await sampleCourses(topic);
    return NextResponse.json({ courses });
  } catch (err) {
    console.error("❌ Error in /api/course:", err);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}
