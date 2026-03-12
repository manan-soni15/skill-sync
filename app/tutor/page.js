import Link from "next/link";

export default function TutorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">
      {/* Header */}
      <div className="bg-black/30 shadow-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-indigo-300">SkillSync Tutor</div>
            <Link
              href="/"
              className="text-indigo-300 hover:text-indigo-400 font-medium transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Your Personal SkillSync Tutor</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Learn and grow with SkillSync Tutor. Here you can practice concepts,
            get explanations, and strengthen your career skills step by step.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Test Yourself Box */}
          <div className="bg-white text-gray-800 rounded-2xl shadow-xl p-10 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">
              📘 Test Yourself
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Challenge yourself with practice problems and quizzes tailored to your learning path.
            </p>
            <div className="flex justify-center">
              <Link href="/testyourself">
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300">
                  Start Quiz
                </button>
              </Link>
            </div>
          </div>

          {/* Learn Anything & Everything Box */}
          <div className="bg-white text-gray-800 rounded-2xl shadow-xl p-10 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">
              📖 Learn Anything & Everything
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Get detailed explanations, step-by-step guides, and learn any topic you want at your own pace.
            </p>
            <div className="flex justify-center">
              <Link href="/learning">
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300">
                  Start Learning From Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* SkillSync Mentor Button */}
        <div className="text-center mt-10">
          <Link href="/profile-success">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
              Go to SkillSync Mentor
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
