"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

/**
 * Question bank
 */
const QUESTION_BANK = [
  {
    id: "domains",
    title: "Which domains excite you right now? (pick up to 3)",
    type: "multi",
    min: 1,
    max: 3,
    options: [
      { label: "Web / App Development", value: "webdev", weight: { software: 2 } },
      { label: "Data & Analytics", value: "data", weight: { data: 2 } },
      { label: "UI/UX & Design", value: "design", weight: { design: 2 } },
      { label: "Product Strategy", value: "product", weight: { product: 2 } },
      { label: "Cybersecurity", value: "security", weight: { security: 2 } },
      { label: "Marketing & Growth", value: "marketing", weight: { marketing: 2 } },
    ],
  },
  {
    id: "activity",
    title: "Which activity sounds most enjoyable?",
    type: "single",
    options: [
      { label: "Building and shipping features", weight: { software: 2, product: 1 } },
      { label: "Finding insights from messy data", weight: { data: 2 } },
      { label: "Designing beautiful, intuitive interfaces", weight: { design: 2 } },
      { label: "Setting vision and prioritizing roadmaps", weight: { product: 2 } },
      { label: "Hardening systems against attacks", weight: { security: 2 } },
      { label: "Crafting campaigns that drive users", weight: { marketing: 2 } },
    ],
  },
  {
    id: "math",
    title: "Comfort with math & statistics?",
    type: "scale",
    min: 1,
    max: 5,
    scaleLabels: ["Low", "", "Medium", "", "High"],
    weightScale: ({ value }) => ({
      data: value >= 4 ? 2 : value === 3 ? 1 : 0,
      security: value >= 4 ? 1 : 0,
      software: value >= 3 ? 1 : 0,
    }),
  },
  {
    id: "creativity",
    title: "You prefer problems that are…",
    type: "single",
    options: [
      { label: "Open-ended & creative", weight: { design: 2, marketing: 1, product: 1 } },
      { label: "Structured & logical", weight: { data: 2, security: 1, software: 1 } },
    ],
  },
  {
    id: "people",
    title: "How much do you enjoy collaboration & communication?",
    type: "scale",
    min: 1,
    max: 5,
    scaleLabels: ["Solo", "", "Balanced", "", "Highly collaborative"],
    weightScale: ({ value }) => ({
      product: value >= 4 ? 2 : value === 3 ? 1 : 0,
      marketing: value >= 4 ? 1 : 0,
      design: value >= 4 ? 1 : 0,
    }),
  },
  {
    id: "detail",
    title: "Attention to detail vs. speed?",
    type: "single",
    options: [
      { label: "Pixel-perfect details matter most", weight: { design: 2, security: 1 } },
      { label: "Balance quality and speed", weight: { product: 2, software: 1 } },
      { label: "Move fast and iterate", weight: { marketing: 2, product: 1 } },
    ],
  },
  {
    id: "tools",
    title: "Which tools sound appealing to you?",
    type: "multi",
    min: 1,
    max: 3,
    options: [
      { label: "React / Next.js / Node", value: "stack_web", weight: { software: 2 } },
      { label: "Python / SQL / Notebooks", value: "stack_data", weight: { data: 2 } },
      { label: "Figma / Prototyping", value: "stack_design", weight: { design: 2 } },
      { label: "Jira / PRDs / OKRs", value: "stack_product", weight: { product: 2 } },
      { label: "OWASP / SIEM / Threat intel", value: "stack_sec", weight: { security: 2 } },
      { label: "CRM / GA / Ads", value: "stack_mkt", weight: { marketing: 2 } },
    ],
  },
  {
    id: "pressure",
    title: "Comfort with high-pressure situations?",
    type: "scale",
    min: 1,
    max: 5,
    scaleLabels: ["Prefer calm", "", "Okay", "", "Thrive under pressure"],
    weightScale: ({ value }) => ({
      security: value >= 4 ? 2 : 0,
      product: value >= 4 ? 1 : 0,
      marketing: value >= 4 ? 1 : 0,
    }),
  },
  {
    id: "impact",
    title: "What kind of impact motivates you most?",
    type: "single",
    options: [
      { label: "Shipping user-facing features", weight: { software: 2, design: 1 } },
      { label: "Influencing decisions with data", weight: { data: 2 } },
      { label: "Shaping product strategy", weight: { product: 2 } },
      { label: "Protecting users & systems", weight: { security: 2 } },
      { label: "Driving growth & awareness", weight: { marketing: 2 } },
    ],
  },
  {
    id: "learning",
    title: "Preferred learning style?",
    type: "single",
    options: [
      { label: "Build projects hands-on", weight: { software: 2, design: 1 } },
      { label: "Structured courses & exercises", weight: { data: 1, security: 1 } },
      { label: "Case studies & market research", weight: { product: 1, marketing: 2 } },
      { label: "Design critiques & iteration", weight: { design: 2 } },
    ],
  },
  {
    id: "time",
    title: "Weekly time you can commit to upskilling?",
    type: "single",
    options: [
      { label: "5–7 hours", weight: { marketing: 1, design: 1 } },
      { label: "8–12 hours", weight: { software: 1, data: 1 } },
      { label: "13+ hours", weight: { software: 1, data: 1, security: 1 } },
    ],
  },
];

const TRACKS = ["software", "data", "design", "product", "security", "marketing"];

const TRACK_INFO = {
  software: {
    title: "Software Engineering",
    skills: ["JavaScript/TypeScript", "React/Next.js", "APIs", "Testing", "Git"],
    roles: ["Frontend Dev", "Full-Stack Dev", "Backend Dev"],
  },
  data: {
    title: "Data Science / Analytics",
    skills: ["Python", "SQL", "Pandas", "Statistics", "Dashboards"],
    roles: ["Data Analyst", "Data Scientist", "BI Analyst"],
  },
  design: {
    title: "UI/UX & Product Design",
    skills: ["Figma", "Wireframing", "Prototyping", "Design Systems"],
    roles: ["Product Designer", "UX Researcher", "UI Designer"],
  },
  product: {
    title: "Product Management",
    skills: ["PRDs", "Roadmapping", "User Research", "Prioritization"],
    roles: ["Associate PM", "Product Manager"],
  },
  security: {
    title: "Cybersecurity",
    skills: ["OWASP", "Threat Modeling", "Network Basics", "SIEM"],
    roles: ["Security Analyst", "AppSec Engineer"],
  },
  marketing: {
    title: "Marketing & Growth",
    skills: ["Messaging", "Analytics", "SEO/SEM", "Campaigns", "CRM"],
    roles: ["Growth Marketer", "Content Strategist"],
  },
};

export default function QuizPage() {
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [finished, setFinished] = useState(false);
  const [scores, setScores] = useState(null);
  const [summary, setSummary] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const total = QUESTION_BANK.length;
  const q = QUESTION_BANK[index];

  const isAnswered = useMemo(() => {
    const val = responses[q?.id];
    if (!q) return false;
    if (q.type === "single") return !!val || val === 0 || !!responses[q.id + "_other"];
    if (q.type === "multi") return (Array.isArray(val) && val.length >= (q.min || 1)) || !!responses[q.id + "_other"];
    if (q.type === "scale") return typeof val === "number" && val >= q.min && val <= q.max;
    return false;
  }, [responses, q]);

  const handleSingle = (optionIdx) => {
    setResponses((prev) => ({ ...prev, [q.id]: optionIdx, [q.id + "_other"]: "" }));
  };

  const toggleMulti = (optionIdx) => {
    setResponses((prev) => {
      const existing = Array.isArray(prev[q.id]) ? prev[q.id] : [];
      const has = existing.includes(optionIdx);
      let next = has ? existing.filter((i) => i !== optionIdx) : [...existing, optionIdx];
      const max = q.max || existing.length;
      if (next.length > max) next = next.slice(0, max);
      return { ...prev, [q.id]: next };
    });
  };

  const handleScale = (value) => {
    setResponses((prev) => ({ ...prev, [q.id]: Number(value) }));
  };

  const next = () => {
    if (!isAnswered) return;
    if (index < total - 1) {
      setIndex((i) => i + 1);
    } else {
      const computed = computeScores(responses);
      setScores(computed);
      setFinished(true);
      fetchAISummary(computed, responses).catch(() => {});
    }
  };

  const back = () => { if (index > 0) setIndex((i) => i - 1); };

  const restart = () => {
    setIndex(0);
    setResponses({});
    setFinished(false);
    setScores(null);
    setSummary("");
    setAiLoading(false);
  };

  async function fetchAISummary(computed, allResponses) {
    setAiLoading(true);
    try {
      const res = await fetch("/api/quiz/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scores: computed, responses: allResponses }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.summary) setSummary(data.summary);
      }
    } catch (_) {}
    finally { setAiLoading(false); }
  }

  function computeScores(all) {
    const tally = TRACKS.reduce((acc, t) => ({ ...acc, [t]: 0 }), {});
    QUESTION_BANK.forEach((qq) => {
      const val = all[qq.id];
      if (qq.type === "single" && typeof val === "number") {
        const opt = qq.options[val];
        if (opt?.weight) addWeights(tally, opt.weight);
      }
      if (qq.type === "multi" && Array.isArray(val)) {
        val.forEach((idx) => {
          const opt = qq.options[idx];
          if (opt?.weight) addWeights(tally, opt.weight);
        });
      }
      if (qq.type === "scale" && typeof qq.weightScale === "function") {
        const w = qq.weightScale({ value: val });
        addWeights(tally, w);
      }
      const otherVal = all[qq.id + "_other"];
      if (otherVal && otherVal.trim()) {
        TRACKS.forEach((t) => { tally[t] += 1; });
      }
    });
    return normalizeScores(tally);
  }

  function addWeights(tally, weight) {
    Object.entries(weight || {}).forEach(([track, pts]) => {
      tally[track] = (tally[track] || 0) + Number(pts || 0);
    });
  }

  function normalizeScores(tally) {
    const max = Math.max(...Object.values(tally));
    if (max <= 0) return tally;
    const factor = 100 / max;
    const out = {};
    for (const k of Object.keys(tally)) out[k] = Math.round(tally[k] * factor);
    return out;
  }

  const progressPct = Math.round(((index + 1) / total) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-12 px-6 relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute w-80 h-80 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ top: "8%", left: "6%" }} />
        <div className="absolute w-64 h-64 bg-gradient-to-r from-pink-600/15 to-orange-600/15 rounded-full blur-3xl animate-bounce" style={{ top: "45%", right: "5%", animationDuration: "4s" }} />
        <div className="absolute w-72 h-72 bg-gradient-to-r from-cyan-600/15 to-indigo-600/15 rounded-full blur-3xl animate-pulse" style={{ bottom: "8%", left: "18%" }} />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl shadow-2xl backdrop-blur p-6 md:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text-primary">Skill Assessment Quiz</h1>
            <p className="text-gray-300 mt-2">Answer a few questions to discover your best-fit career path.</p>
          </div>

          {!finished ? (
            <>
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <span>Question {index + 1} / {total}</span>
                  <span>{progressPct}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: `${progressPct}%` }} />
                </div>
              </div>

              <div className="bg-slate-800/60 border border-white/10 rounded-xl p-5 md:p-6">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">{q.title}</h2>

                {/* SINGLE */}
                {q.type === "single" && (
                  <div className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                      {q.options.map((opt, i) => {
                        const active = responses[q.id] === i;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSingle(i)}
                            className={`text-left p-4 rounded-xl border transition-all
                              ${active ? "border-blue-400/60 bg-blue-500/10 shadow-lg" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                    <input
                      type="text"
                      placeholder="Other (please specify)"
                      value={responses[q.id + "_other"] || ""}
                      onChange={(e) =>
                        setResponses((prev) => ({ ...prev, [q.id + "_other"]: e.target.value, [q.id]: null }))
                      }
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400"
                    />
                  </div>
                )}

                {/* MULTI */}
                {q.type === "multi" && (
                  <>
                    <p className="text-sm text-gray-400 mb-3">
                      Select {q.min ? `at least ${q.min}` : ""}{q.min && q.max ? " and " : ""}{q.max ? `up to ${q.max}` : ""}.
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {q.options.map((opt, i) => {
                        const arr = Array.isArray(responses[q.id]) ? responses[q.id] : [];
                        const active = arr.includes(i);
                        const disabled = !active && q.max && arr.length >= q.max;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => toggleMulti(i)}
                            disabled={disabled}
                            className={`text-left p-4 rounded-xl border transition-all
                              ${active ? "border-purple-400/60 bg-purple-500/10 shadow-lg" : "border-white/10 bg-white/5 hover:bg-white/10"}
                              ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                    <input
                      type="text"
                      placeholder="Other (please specify)"
                      value={responses[q.id + "_other"] || ""}
                      onChange={(e) =>
                        setResponses((prev) => ({ ...prev, [q.id + "_other"]: e.target.value }))
                      }
                      className="mt-3 w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400"
                    />
                  </>
                )}

                {/* SCALE */}
                {q.type === "scale" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 justify-between text-sm text-gray-400">
                      {Array.from({ length: q.max - q.min + 1 }, (_, i) => q.scaleLabels?.[i] || "").map((lbl, i) => (
                        <span key={i}>{lbl}</span>
                      ))}
                    </div>
                    <input
                      type="range"
                      min={q.min}
                      max={q.max}
                      step="1"
                      value={responses[q.id] || q.min}
                      onChange={(e) => handleScale(e.target.value)}
                      className="w-full accent-blue-500"
                    />
                    <div className="text-center text-lg font-medium text-blue-400">
                      {responses[q.id] ?? q.min}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-6">
                <button onClick={back} disabled={index === 0} className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-40">
                  Back
                </button>
                <button
                  onClick={next}
                  disabled={!isAnswered}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-40"
                >
                  {index === total - 1 ? "Finish" : "Next"}
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold gradient-text-primary">Your Best-Fit Career Paths</h2>
                <p className="text-gray-300 mt-2">Here’s where your strengths align:</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {TRACKS.map((t) => (
                  <div key={t} className="p-5 rounded-xl border border-white/10 bg-slate-800/60">
                    <h3 className="text-xl font-semibold mb-2 text-blue-300">{TRACK_INFO[t].title}</h3>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-3">
                      <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${scores?.[t] || 0}%` }} />
                    </div>
                    <p className="text-gray-300 text-sm mb-2">Top skills:</p>
                    <ul className="list-disc list-inside text-gray-400 text-sm">
                      {TRACK_INFO[t].skills.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                    <p className="text-gray-300 text-sm mt-3">Sample roles:</p>
                    <ul className="list-disc list-inside text-gray-400 text-sm">
                      {TRACK_INFO[t].roles.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button onClick={restart} className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  Take Again
                </button>
              </div>
              <div className="bg-slate-800/60 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">AI-Powered Guidance</h3>
                {aiLoading ? (
                  <p className="text-gray-400 italic">Generating personalized advice…</p>
                ) : summary ? (
                  <p className="text-gray-300 whitespace-pre-line">{summary}</p>
                ) : (
                  <p className="text-gray-400 italic">No summary available.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
