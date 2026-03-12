'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-900 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link href="/" className="text-2xl font-bold tracking-wide text-indigo-200">
          SkillSync
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8 relative">
          {/* Tutor Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => toggleDropdown('tutor')}
            onMouseLeave={() => toggleDropdown(null)}
          >
            <button className="hover:text-indigo-300 transition font-semibold">
              Tutor ▾
            </button>
            {openDropdown === 'tutor' && (
              <div className="absolute left-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg overflow-hidden">
                <Link href="/tutor/page1" className="block px-4 py-2 hover:bg-indigo-100">
                  test yourself
                </Link>
                <Link href="/tutor/page2" className="block px-4 py-2 hover:bg-indigo-100">
                  learn 
                </Link>
              </div>
            )}
          </div>

          {/* Mentor Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => toggleDropdown('mentor')}
            onMouseLeave={() => toggleDropdown(null)}
          >
            <button className="hover:text-indigo-300 transition font-semibold">
              Mentor ▾
            </button>
            {openDropdown === 'mentor' && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden">
                <Link href="/roadmap" className="block px-4 py-2 hover:bg-indigo-100">
                  Roadmap
                </Link>
                <Link href="/course" className="block px-4 py-2 hover:bg-indigo-100">
                  Materials
                </Link>
                <Link href="/quiz" className="block px-4 py-2 hover:bg-indigo-100">
                  Skill Assessment
                </Link>
              </div>
            )}
          </div>

          {/* AI Chatbot */}
          <Link href="/ai-chatbot" className="hover:text-indigo-300 font-semibold transition">
            🤖 AI Chatbot
          </Link>

          {/* Profile / Clerk User Button */}
          <div className="ml-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
}
