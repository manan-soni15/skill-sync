'use client';

import Link from 'next/link';

export default function YourPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-12 text-center">
        Choose Your Role
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Skillsync Mentor Block */}
        <Link href="/profile-success">
          <div className="relative bg-gradient-to-br from-purple-600 to-indigo-600 hover:scale-105 transform transition-all duration-300 rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer shadow-2xl">
            <div className="text-6xl mb-4">🎓</div>
            <h2 className="text-2xl font-bold text-white mb-2">Skillsync Mentor</h2>
            <p className="text-white/80 text-center">
              Guide students, share your knowledge, and help them grow in their career journey.
            </p>
          </div>
        </Link>

        {/* Skillsync Tutor Block */}
        <Link href="/tutor">
          <div className="relative bg-gradient-to-br from-indigo-600 to-purple-500 hover:scale-105 transform transition-all duration-300 rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer shadow-2xl">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-white mb-2">Skillsync Tutor</h2>
            <p className="text-white/80 text-center">
              Learn new skills, access curated courses, and take your knowledge to the next level.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
