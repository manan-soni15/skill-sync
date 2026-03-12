import Link from "next/link";

export default function ProfileSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-700 to-purple-700 relative overflow-hidden">
      {/* Shine effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-1/2 h-full bg-white/10 transform rotate-45 animate-pulse-slow" />
      </div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-indigo-700">SkillSync</div>
            <Link
              href="/"
              className="text-indigo-700 hover:text-purple-700 font-medium transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Success Message */}
        <div className="text-center mb-16 text-white">
          <div className="text-5xl sm:text-6xl mb-4 animate-bounce">🚀</div>
          <h1 className="text-4xl font-bold mb-4">
            This Is Your SkillSync Mentor
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Welcome to Career-Path! Your journey to career success starts here.
            Explore our powerful features designed to guide you every step of
            the way.
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Powerful Features to Accelerate Your Career
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Personalized Career Roadmap */}
            <Link
              href="/roadmap"
              className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-white/30 hover:border-indigo-400 transform hover:-translate-y-2 block"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                Personalized Career Roadmap
              </h3>
              <p className="text-white/90 text-center leading-relaxed">
                Get a customized step-by-step plan tailored to your skills,
                interests, and career goals. Our AI creates a unique path just
                for you.
              </p>
              <div className="mt-6 text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-200/30 text-white">
                  AI-Powered
                </span>
              </div>
            </Link>

            {/* Real-time Job & Course Recommendations */}
            <Link href="/course">
              <div className="cursor-pointer bg-white/20 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-white/30 hover:border-blue-400 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                   Course Recommendations
                </h3>
                <p className="text-white/90 text-center leading-relaxed">
                 learning courses
                  updated in real-time. Stay ahead with the latest market trends
                  and demands.
                </p>
                <div className="mt-6 text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-200/30 text-white">
                    Live Updates
                  </span>
                </div>
              </div>
            </Link>

            {/* AI Mentor Chatbot */}
            <Link
              href="/chat"
              className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-white/30 hover:border-purple-400 transform hover:-translate-y-2 block"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                AI Mentor Chatbot
              </h3>
              <p className="text-white/90 text-center leading-relaxed">
                Chat with your personal AI mentor 24/7. Get instant answers,
                career advice, and guidance whenever you need it.
              </p>
              <div className="mt-6 text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-200/30 text-white">
                  24/7 Available
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Skill Assessment Quiz */}
        <Link
          href="/quiz"
          className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-white/30 hover:border-indigo-400 transform hover:-translate-y-2 block"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            Skill Assessment Quiz
          </h3>
          <p className="text-white/90 text-center leading-relaxed">
            Take an AI-powered quiz where smart questions help you identify your
            true interests and skills. Discover the areas you should grow in for
            your career.
          </p>
          <div className="mt-6 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-200/30 text-white">
              AI-Driven Quiz
            </span>
          </div>
        </Link>

        {/* SkillSync Tutor Button */}
        <div className="mt-8 text-center">
          <Link href="/tutor">
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300">
              SkillSync Tutor
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
