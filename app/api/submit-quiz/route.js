import { NextResponse } from "next/server";
import fs from "fs";

export async function POST(req) {
  try {
    const { studentEmail, subject, answers } = await req.json();

    // 1️⃣ Initialize counters
    let scoreEasy = 0;
    let scoreMedium = 0;
    let scoreHard = 0;
    let scoreExtreme = 0;

    // 2️⃣ Calculate difficulty-wise score
    answers.forEach((a) => {
      if (a.isCorrect) {
        if (a.difficulty === "Easy") scoreEasy++;
        if (a.difficulty === "Medium") scoreMedium++;
        if (a.difficulty === "Hard") scoreHard++;
        if (a.difficulty === "Extreme") scoreExtreme++;
      }
    });

    const totalScore =
      scoreEasy + scoreMedium + scoreHard + scoreExtreme;

    const maxScore = 12;
    const timestamp = new Date().toISOString();

    // 3️⃣ Prepare CSV row
    const row = `${studentEmail},${subject},${scoreEasy},${scoreMedium},${scoreHard},${scoreExtreme},${totalScore},${maxScore},${timestamp}\n`;

    // 4️⃣ Save to CSV
    fs.appendFileSync("quiz_results.csv", row);

    // 5️⃣ Respond back
    return NextResponse.json({
      success: true,
      scores: {
        easy: scoreEasy,
        medium: scoreMedium,
        hard: scoreHard,
        extreme: scoreExtreme,
        total: totalScore,
      },
    });
  } catch (error) {
    console.error("Submit quiz error:", error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
