import React, { useEffect } from 'react';
import { Link, useLocation } from 'wouter';

export default function SimpleHeader() {
  const [location] = useLocation();

  // Scroll to top when the location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22C16.59 20.85 20 16.14 20 11.09V5L12 2Z" fill="#60A5FA" stroke="white" strokeWidth="1.5"/>
              <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <Link href="/">
              <div className="cursor-pointer">
                <h1 className="text-3xl font-bold tracking-tight">
                  <span className="text-blue-300">Neo</span>
                  <span className="text-white">Safe</span>
                </h1>
              </div>
            </Link>
            <p className="text-blue-100">Your personal data breach detection service</p>
          </div>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="/">
            <span className={`cursor-pointer text-white hover:text-blue-200 transition-colors ${location === '/' ? 'border-b-2 border-blue-300 pb-1' : ''}`}>Home</span>
          </Link>
          <Link href="/about">
            <span className={`cursor-pointer text-white hover:text-blue-200 transition-colors ${location === '/about' ? 'border-b-2 border-blue-300 pb-1' : ''}`}>About</span>
          </Link>
          <Link href="/faq">
            <span className={`cursor-pointer text-white hover:text-blue-200 transition-colors ${location === '/faq' ? 'border-b-2 border-blue-300 pb-1' : ''}`}>FAQ</span>
          </Link>
          <Link href="/contact">
            <span className={`cursor-pointer text-white hover:text-blue-200 transition-colors ${location === '/contact' ? 'border-b-2 border-blue-300 pb-1' : ''}`}>Contact</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}