"use client";

import { useState } from "react";
import { microsoftLearnIndex } from "@/lib/microsoftLearnIndex";

export default function LearningPage() {
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [source, setSource] = useState("ai");
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState({});
  const [completedTopics, setCompletedTopics] = useState({});

  const normalizeSubject = (value) =>
    value.toLowerCase().trim().replace(/\s+/g, "");

  const normalizedSubject = normalizeSubject(subject);

  const handleGenerate = async () => {
    if (!subject.trim()) {
      setError("Please enter a subject.");
      return;
    }

    setError("");
    setLoading(true);
    setRoadmap(null);
    setExpanded({});
    setCompletedTopics({});

    try {
      const res = await fetch("/api/learning", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject }),
      });

      const data = await res.json();

      if (data?.error) {
        setError(data.error);
      } else {
        setRoadmap(Array.isArray(data.learning) ? data.learning : []);
        setSource(data.source || "ai");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to generate roadmap. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- COMPLETION HELPERS ---------- */

  const markTopicComplete = (sIdx, tIdx) => {
    setCompletedTopics((prev) => {
      const set = new Set(prev[sIdx] || []);
      set.has(tIdx) ? set.delete(tIdx) : set.add(tIdx);
      return { ...prev, [sIdx]: set };
    });
  };

  const markLevelComplete = (sIdx) => {
    setCompletedTopics((prev) => ({
      ...prev,
      [sIdx]: new Set(["level"]),
    }));
  };

  const sectionProgress = (sIdx, totalTopics) => {
    if (source === "microsoft") {
      return completedTopics[sIdx]?.has("level") ? 100 : 0;
    }
    const completed = completedTopics[sIdx]?.size || 0;
    return Math.round((completed / totalTopics) * 100);
  };

  const allCompleted = roadmap
    ? roadmap.every(
        (section, sIdx) =>
          sectionProgress(sIdx, section.topics?.length || 1) === 100
      )
    : false;

  /* ---------- UI ---------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto bg-black/50 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-white/10">

        {/* INPUT */}
        {!roadmap && (
          <>
            <h1 className="text-4xl font-extrabold mb-4 text-center text-indigo-300">
              Learn Anything, Step by Step
            </h1>
            <p className="text-gray-300 text-center mb-8 text-lg">
              Enter a subject and get a structured roadmap with progress tracking.
            </p>

            <div className="flex gap-4 mb-6">
              <input
                type="text"
                placeholder="e.g. HTML, Python, Machine Learning"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700"
              />
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="px-6 py-3 rounded-lg bg-indigo-600 font-semibold"
              >
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
          </>
        )}

        {error && <p className="text-red-400 text-center">{error}</p>}

        {/* ROADMAP */}
        {roadmap && roadmap.length > 0 && (
          <div className="mt-8 space-y-8">
            {roadmap.map((section, sIdx) => {
              const progress = sectionProgress(
                sIdx,
                section.topics?.length || 1
              );

              const isUnlocked =
                sIdx === 0 ||
                sectionProgress(
                  sIdx - 1,
                  roadmap[sIdx - 1].topics?.length || 1
                ) === 100;

              return (
                <div
                  key={sIdx}
                  className={`p-6 rounded-xl border ${
                    isUnlocked ? "bg-white/5" : "opacity-50"
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-indigo-200">
                      {section.title}
                    </h2>
                    <span className="text-sm font-bold">{progress}%</span>
                  </div>

                  {isUnlocked && (
                    source === "microsoft" ? (
                      /* ---------- MICROSOFT LEARN MODE ---------- */
                      <div className="border border-white/10 rounded-lg p-4">
                        {(() => {
                          const levelKey = section.title.toLowerCase();
                          const msLearn =
                            microsoftLearnIndex[normalizedSubject]?.[levelKey];

                          if (!msLearn) return null;

                          const isCompleted =
                            completedTopics[sIdx]?.has("level");

                          return (
                            <>
                              <p className="font-semibold text-indigo-200">
                                Microsoft Learn – {section.title}
                              </p>
                              <p className="text-gray-400 text-sm mt-1">
                                {msLearn.title}
                              </p>

                              <a
                                href={msLearn.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block mt-2 text-indigo-300 underline"
                              >
                                Open Microsoft Learn →
                              </a>

                              <button
                                onClick={() => markLevelComplete(sIdx)}
                                className={`mt-4 px-4 py-2 rounded-md text-sm ${
                                  isCompleted
                                    ? "bg-green-600"
                                    : "bg-gray-700 hover:bg-gray-600"
                                }`}
                              >
                                {isCompleted
                                  ? "✔ Level Completed"
                                  : "Mark Level Complete"}
                              </button>
                            </>
                          );
                        })()}
                      </div>
                    ) : (
                      /* ---------- AI MODE (OLD BEHAVIOR) ---------- */
                      <ul className="space-y-4">
                        {section.topics.map((t, tIdx) => {
                          const isCompleted =
                            completedTopics[sIdx]?.has(tIdx);

                          return (
                            <li
                              key={tIdx}
                              className="bg-white/5 p-4 rounded-lg"
                            >
                              <div className="flex justify-between">
                                <div>
                                  <div className="font-medium">{t.title}</div>
                                  <div className="text-xs text-gray-400">
                                    {t.estimated_time}
                                  </div>
                                </div>

                                <button
                                  onClick={() =>
                                    markTopicComplete(sIdx, tIdx)
                                  }
                                  className={`px-3 py-1 rounded ${
                                    isCompleted
                                      ? "bg-green-600"
                                      : "bg-gray-700"
                                  }`}
                                >
                                  {isCompleted ? "✔" : "✓"}
                                </button>
                              </div>

                              {t.detailed_explanation && (
                                <p className="mt-2 text-sm text-gray-300">
                                  {t.detailed_explanation}
                                </p>
                              )}

                              {Array.isArray(t.resources) && t.resources.length > 0 && (
  <ul className="mt-2 list-disc list-inside text-sm text-gray-400 space-y-1">
    {t.resources.map((r, i) => (
      <li key={i}>
        {typeof r === "string" && r.startsWith("http") ? (
          <a
            href={r}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-300 underline hover:text-indigo-200"
          >
            {r}
          </a>
        ) : (
          r
        )}
      </li>
    ))}
  </ul>
)}

  </li>
   );
     })}
      </ul>
        )
   )}
       </div>
       );
         })}
          </div>
        )}

        {/* RESET */}
        {allCompleted && (
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setRoadmap(null);
                setSubject("");
                setCompletedTopics({});
              }}
              className="px-6 py-3 bg-purple-600 rounded-lg"
            >
              Generate New
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
