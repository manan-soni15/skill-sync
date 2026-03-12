'use client';

import { useState, useEffect } from 'react';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function GetStarted() {
  const [userName, setUserName] = useState('Student');
  const [showForm, setShowForm] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // ✅ Check if user already filled the form
  useEffect(() => {
    const registered = localStorage.getItem('skillsync_registered');
    if (registered === 'true') {
      setIsRegistered(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 via-cyan-600 to-emerald-600 relative overflow-hidden">

      {/* Shine effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-1/2 h-full bg-white/10 transform rotate-45 animate-pulse-slow" />
      </div>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-bold text-teal-700">
            SkillSync
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="text-gray-800 text-sm sm:text-base">
              Welcome, {userName}!
            </span>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-center relative z-10">

        {/* Welcome Section */}
        <div className="text-center mb-12 max-w-2xl mx-auto text-white">
          <div className="text-5xl sm:text-6xl mb-4 animate-bounce">👋</div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Welcome to SkillSync!
          </h1>
          <p className="text-base sm:text-lg text-white/90">
            You're just getting started on your journey to success.
          </p>
        </div>

        {/* Action Card */}
        <div className="max-w-2xl w-full mb-12">
          {!isRegistered ? (
            <div
              onClick={() => setShowForm(true)}
              className="bg-white/20 border-2 border-white/40 hover:bg-white/30 rounded-xl p-6 sm:p-8 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-2xl relative"
            >
              <div className="absolute top-3 right-3 bg-cyan-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                Start Here
              </div>
              <div className="text-3xl sm:text-4xl mb-4">🎓</div>
              <h3 className="text-lg sm:text-xl font-bold mb-3">
                Complete Your Profile
              </h3>
              <p className="text-white/90 text-sm sm:text-base">
                Please fill a form to personalize your experience.
              </p>
            </div>
          ) : (
            <Link href="/your">
              <div className="bg-white/20 border-2 border-white/40 hover:bg-white/30 rounded-xl p-6 sm:p-8 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-2xl">
                <div className="text-3xl sm:text-4xl mb-4">🚀</div>
                <h3 className="text-lg sm:text-xl font-bold mb-3">
                  Continue
                </h3>
                <p className="text-white/90 text-sm sm:text-base">
                  Your profile is already completed.
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Profile Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 sm:p-8 relative">

            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✖
            </button>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
              Complete Your Profile
            </h2>

            {/* ✅ MICROSOFT FORM EMBED */}
            <iframe
              src="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAqEBuGhUNEJHU0lKQkxTMDA4Sk5aNFhWNFU1TEpWQS4u&embed=true"
              width="100%"
              height="450"
              style={{ border: 'none' }}
            />

            {/* ✅ CONFIRM BUTTON (SAFE & CORRECT) */}
            <button
              onClick={() => {
                localStorage.setItem('skillsync_registered', 'true');
                setIsRegistered(true);
                setShowForm(false);
              }}
              className="mt-4 w-full bg-cyan-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-teal-600 transition-colors"
            >
              CONTINUE AFTER YOU SUBMIT YOUR FORM
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
