"use client";
import { useState } from "react";

export default function RoadmapPage() {
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [goals, setGoals] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRoadmap([]);

    const res = await fetch("/api/roadmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        skills: skills.split(","),
        interests,
        goals,
      }),
    });

    const data = await res.json();

    const steps = data.roadmap
      .split("\n")
      .filter((line) => line.trim() !== "");

    setRoadmap(steps);
    setLoading(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSkills("");
    setInterests("");
    setGoals("");
    setRoadmap([]);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-6 relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-2xl shadow-2xl">
          <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-8">
            Personalized Career Roadmap
          </h1>

          {/* Form */}
{!submitted && (
  <form onSubmit={handleSubmit} className="space-y-4">
    <input
      type="text"
      placeholder="Your skills (comma separated)"
      value={skills}
      onChange={(e) => setSkills(e.target.value)}
      required
      className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
    <input
      type="text"
      placeholder="Your interests"
      value={interests}
      onChange={(e) => setInterests(e.target.value)}
      required
      className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
    <input
      type="text"
      placeholder="Your career goal"
      value={goals}
      onChange={(e) => setGoals(e.target.value)}
      required
      className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />

    <button
      type="submit"
      disabled={loading}
      className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition flex justify-center items-center"
    >
      {loading ? (
        <span className="flex items-center">
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
          SyncSkill is building your roadmap…
        </span>
      ) : (
        "Generate Roadmap"
      )}
    </button>
  </form>
)}


          {/* Roadmap */}
          {roadmap.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-center text-indigo-300">
                🚀 Your Career Journey
              </h2>

              {/* Zig-zag roadmap */}
              <div className="relative flex flex-col items-center">
                <div className="absolute w-1 bg-gradient-to-b from-indigo-500 to-purple-500 h-full"></div>
                {roadmap.map((step, idx) => (
                  <div
                    key={idx}
                    className={`w-full flex ${
                      idx % 2 === 0 ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div className="relative w-1/2 p-4">
                      {/* Step marker */}
                      <div className="absolute top-6 -ml-4 w-8 h-8 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full font-bold text-white shadow-md z-10">
                        {idx + 1}
                      </div>
                      <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl border border-white/20 p-6 shadow-lg hover:shadow-xl transition ml-6">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          Step {idx + 1}
                        </h3>
                        <p className="text-gray-200">{step}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Generate New Roadmap Button */}
              <div className="mt-10 text-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
                >
                  Generate New Roadmap
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
