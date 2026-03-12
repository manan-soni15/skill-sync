"use client";

import { useState } from "react";

export default function TestYourselfPage() {
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Generate quiz
  const handleGenerate = async () => {
    if (!subject.trim()) return;
    setLoading(true);
    setQuiz(null);
    setSubmitted(false);
    setAnswers({});
    setScore(0);

    try {
      const res = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject }),
      });

      const data = await res.json();

      // ✅ Add unique IDs to each question
      const quizWithIds = data.quiz.map((q, i) => ({ ...q, id: i }));
      setQuiz(quizWithIds);
    } catch (err) {
      console.error("Error fetching quiz:", err);
    } finally {
      setLoading(false);
    }
  };

  // Track answers
  const handleAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  // ✅ NEW: submit quiz result to backend (CSV)
  const submitQuizResult = async (answersPayload) => {
    try {
      await fetch("/api/submit-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentEmail: "testuser@gmail.com", // replace with Clerk email later
          subject,
          answers: answersPayload,
        }),
      });
    } catch (err) {
      console.error("Error submitting quiz result:", err);
    }
  };

  // ✅ UPDATED: Calculate score + send to backend
  const handleSubmit = async () => {
    if (!quiz) return;

    let newScore = 0;

    // Prepare answers payload for backend
    const answersPayload = quiz.map((q) => {
      const isCorrect = answers[q.id] === q.answer;
      if (isCorrect) newScore++;

      return {
        difficulty: q.difficulty,
        isCorrect,
      };
    });

    setScore(newScore);
    setSubmitted(true);

    // Send result to backend → CSV
    await submitQuizResult(answersPayload);
  };

  // Group by difficulty
  const groupByDifficulty = (questions) => {
    const groups = { Easy: [], Medium: [], Hard: [], Extreme: [] };
    questions.forEach((q) => {
      if (groups[q.difficulty]) {
        groups[q.difficulty].push(q);
      }
    });
    return groups;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white/90 text-gray-900 p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Test Yourself
        </h1>

        {/* Subject Input */}
        {!quiz && !loading && (
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Enter a subject (e.g. Python, Physics, AI)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg text-black"
            />
            <button
              onClick={handleGenerate}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Generate Quiz
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-600">
            SkillSync is generating quiz (may take 1 to 2 minutes)...
          </p>
        )}

        {/* Quiz Display */}
        {quiz && !submitted && (
          <div className="mt-8 space-y-12">
            {Object.entries(groupByDifficulty(quiz)).map(
              ([level, questions]) => (
                <div key={level} className="border-t border-gray-300 pt-6">
                  <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">
                    {level} Questions
                  </h2>
                  <div className="space-y-6">
                    {questions.map((q) => {
                      const qKey = q.id;
                      return (
                        <div
                          key={q.id}
                          className="p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition"
                        >
                          <p className="font-medium mb-3">{q.question}</p>
                          <div className="space-y-2">
                            {q.options.map((opt, i) => (
                              <label key={i} className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={qKey}
                                  value={opt}
                                  checked={answers[qKey] === opt}
                                  onChange={() => handleAnswer(qKey, opt)}
                                  className="accent-indigo-500"
                                />
                                {opt}
                              </label>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            )}

            {/* Submit Button */}
            <div className="text-center mt-8">
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
              >
                Submit Quiz
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {submitted && (
          <div className="mt-10 space-y-10">
            <h2 className="text-2xl font-bold text-indigo-700 text-center">
              🎉 Quiz Results
            </h2>
            <p className="mt-4 text-lg text-center">
              You scored <span className="font-bold">{score}</span> out of{" "}
              {quiz.length}.
            </p>

            {Object.entries(groupByDifficulty(quiz)).map(
              ([level, questions]) => (
                <div key={level} className="border-t border-gray-300 pt-6">
                  <h3 className="text-xl font-bold mb-4 text-indigo-700 text-center">
                    {level} Questions
                  </h3>
                  <div className="space-y-6">
                    {questions.map((q) => {
                      const qKey = q.id;
                      const userAnswer = answers[qKey];
                      const isCorrect = userAnswer === q.answer;

                      return (
                        <div
                          key={q.id}
                          className={`p-4 rounded-lg shadow-sm ${
                            isCorrect ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          <p className="font-medium mb-2">{q.question}</p>
                          <p>
                            Your Answer:{" "}
                            <span
                              className={
                                isCorrect
                                  ? "text-green-700"
                                  : "text-red-700"
                              }
                            >
                              {userAnswer || "Not answered"}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p>
                              Correct Answer:{" "}
                              <span className="text-green-700">
                                {q.answer}
                              </span>
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            )}

            <div className="text-center mt-8">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setQuiz(null);
                  setSubject("");
                }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Try Another Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
