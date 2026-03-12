'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    }; 

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Simple fade-in animation on scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div>
        {/* Dynamic gradient orbs */}
        <div
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        <div 
          className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-r from-pink-600/20 to-orange-600/20 rounded-full blur-3xl animate-bounce"
          style={{
            animationDelay: '3s',
            transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-r from-cyan-600/25 to-indigo-600/25 rounded-full blur-3xl animate-pulse" 
          style={{ animationDelay: '2s' }} 
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        {/* Static background elements */}
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-r from-cyan-600/25 to-indigo-600/25 rounded-full blur-3xl animate-pulse" 
          style={{ animationDelay: '2s' }} 
        />
        
        {/* Geometric shapes */}
        <div/>
        <div />
        <div  />
        
        {/* Geometric shapes */}
        <div />
        <div  />
        <div  />
      </div>

      {/* Simple Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-none">
              SkillSync
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'Features', 'About'].map((item, index) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium relative group transform hover:scale-110"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-150"></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center pt-16 pb-20 relative">
            {/* Floating badge with enhanced animation */}
            <div className="inline-block mb-4 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 text-blue-300 text-sm font-medium animate-bounce shadow-lg">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></span>
                ✨ AI-Powered Career Guidance
              </span>
            </div>
            
            {/* Main heading with spectacular animation */}
            <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="inline-block animate-bounce" style={{ animationDelay: '2s' }}>Learn</span>
              <span className="text-gray-400 mx-4">•</span>
              <span className="inline-block animate-bounce" style={{ animationDelay: '2s' }}>Grow</span>
              <span className="text-gray-400 mx-4">•</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 relative inline-block animate-bounce" style={{ animationDelay: '2s' }}>
                Get Hired
                <svg className="absolute -bottom-2 left-0 w-full h-3 animate-pulse" viewBox="0 0 200 12" fill="none">
                  <path d="M2 6C2 6 50 2 100 6C150 10 198 6 198 6" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#f472b6" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.5s' }}>
              Your personal AI mentor that helps students build the right skills, find opportunities, 
              and land their dream jobs through personalized guidance.
            </p>
            
            <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <Link 
                href="/getstarted"
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>
            </div>
          </div>

          {/* Enhanced illustration with 3D effects */}
          <div className="relative max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/10 relative overflow-hidden">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-pulse"></div>
              
              <div className="grid md:grid-cols-3 gap-6 relative z-10">
                <div className="text-center p-6 group cursor-pointer">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-blue-500/50">
                    <span className="text-3xl animate-bounce" style={{ animationDelay: '1s' }}>📚</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">Learn Skills</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Get personalized learning paths</p>
                </div>
                <div className="text-center p-6 group cursor-pointer">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                    <span className="text-3xl animate-bounce" style={{ animationDelay: '1.2s' }}>📈</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">Track Progress</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Monitor your growth journey</p>
                </div>
                <div className="text-center p-6 group cursor-pointer">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-orange-500/50">
                    <span className="text-3xl animate-bounce" style={{ animationDelay: '1.4s' }}>🎯</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">Find Jobs</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Connect with opportunities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 fade-in-section relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/50 to-transparent"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Simple tools that make a real difference in your career journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              {
                icon: '🤖',
                title: 'AI Career Coach',
                description: 'Get personalized advice and recommendations based on your goals and current skills.',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: '🎓',
                title: 'Skill Assessment',
                description: 'Understand your strengths and identify areas for improvement with detailed analysis.',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: '📊',
                title: 'Progress Tracking',
                description: 'Visualize your learning journey and see how far you\'ve come.',
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                icon: '💼',
                title: 'Job Matching',
                description: 'Find opportunities that align with your skills and career aspirations.',
                gradient: 'from-orange-500 to-red-500'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 rounded-2xl transition-all duration-500 border border-white/10 hover:border-white/30 cursor-pointer relative overflow-hidden transform hover:scale-105 hover:shadow-2xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Animated background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300 group-hover:animate-bounce">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 px-6 fade-in-section relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              How it works
            </h2>
            <p className="text-lg text-gray-300">
              Get started in just a few simple steps
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                step: '01',
                title: 'Sign up and tell us about yourself',
                description: 'Share your background, interests, and career goals so we can personalize your experience.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                step: '02',
                title: 'Get your personalized roadmap',
                description: 'Our AI analyzes your profile and creates a custom learning path just for you.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                step: '03',
                title: 'Start learning and growing',
                description: 'Follow your roadmap, complete activities, and track your progress along the way.',
                color: 'from-green-500 to-emerald-500'
              },
              {
                step: '04',
                title: 'Land your dream job',
                description: 'Apply to matched opportunities and use our tools to ace your interviews.',
                color: 'from-orange-500 to-red-500'
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-6 group">
                <div className={`bg-gradient-to-r ${item.color} text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300 group-hover:animate-pulse`}>
                  {item.step}
                </div>
                <div className="group-hover:translate-x-2 transition-transform duration-300">
                  <h3 className="text-2xl font-semibold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-lg group-hover:text-gray-300 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 fade-in-section relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            Ready to start your journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join other students who are already building their dream careers
          </p>
          <Link 
            href="/getstarted"
            className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-5 rounded-2xl font-semibold text-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden inline-block"
          >
            <span className="relative z-10 flex items-center gap-3">
              Get Started
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </Link>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 px-6 border-t border-white/10 bg-slate-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">SkillSync</div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }

        .fade-in-section.animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(147, 51, 234, 0.8);
          }
        }
      `}</style>
    </div>
  );
}