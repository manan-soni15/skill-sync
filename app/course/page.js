'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CoursePage() {
  const [topic, setTopic] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleSearch = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic or subject.');
      return;
    }
    setError('');
    setLoading(true);
    setCourses([]);

    try {
      const res = await fetch('/api/course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      if (data?.error) {
        setError(data.error);
      } else {
        setCourses(data.courses ?? []);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch courses. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-950 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-md border border-white/10">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-300 tracking-wide">
          🎓 Smart Course Finder
        </h1>

        {/* Input */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="Enter topic or subject..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 shadow-inner focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold hover:opacity-90 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        {/* Results */}
        {courses.length > 0 && (
          <div className="space-y-8 mt-8">
            {courses.map((course, idx) => (
              <div
                key={idx}
                className="bg-white/20 p-6 rounded-2xl shadow-md border border-white/30 hover:bg-white/25 transition"
              >
                <h2 className="text-2xl font-bold text-indigo-200 mb-3">
                  {course.title}
                </h2>
                <p className="text-gray-200 mb-5">{course.description}</p>

                {/* Recommended YouTube */}
                {course.youtube && (
                  <div className="mb-5">
                    <p className="text-indigo-300 font-semibold">
                      ▶️ Recommended Video:
                    </p>
                    <a
                      href={course.youtube.link}
                      target="_blank"
                      rel="noreferrer"
                      className="block mt-2 px-4 py-2 rounded-lg bg-indigo-700/40 hover:bg-indigo-700/60 transition underline text-indigo-100"
                    >
                      {course.youtube.title}
                    </a>
                  </div>
                )}

                {/* Coursera */}
                {course.coursera && (
                  <div className="mb-5">
                    <p className="text-indigo-300 font-semibold">
                      Coursera Courses:
                    </p>
                    <a
                      href={course.coursera}
                      target="_blank"
                      rel="noreferrer"
                      className="block mt-2 px-4 py-2 rounded-lg bg-indigo-700/40 hover:bg-indigo-700/60 transition underline text-indigo-100"
                    >
                      Browse Coursera
                    </a>
                  </div>
                )}

                {/* Dropdown */}
                {course.others?.length > 0 && (
                  <div>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === idx ? null : idx)
                      }
                      className="flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
                    >
                      {openDropdown === idx
                        ? '🔼 Hide Other Resources'
                        : '🔽 Show Other Resources'}
                    </button>

                    {openDropdown === idx && (
                      <ul className="mt-4 space-y-3 pl-2 border-l border-indigo-500/50">
                        {course.others.map((link, i) => (
                          <li key={i}>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noreferrer"
                              className="block px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition underline text-indigo-200"
                            >
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Footer Buttons (wrapped with Link) */}
            <div className="flex justify-between mt-10">
              <Link
                href="/profile-success" // change this to your previous page route
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 font-semibold hover:opacity-90 transition"
              >
                ⬅️ Previous
              </Link>
              <Link
                href="/course" // stays on course page, triggers new search
                onClick={handleSearch}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 font-semibold hover:opacity-90 transition"
              >
                🔄 Search Again
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
