import React from 'react';
import { Link } from 'wouter';

export default function SimpleFooter() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <svg width="24" height="24" className="mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22C16.59 20.85 20 16.14 20 11.09V5L12 2Z" fill="#60A5FA" stroke="white" strokeWidth="1.5"/>
                <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-blue-300">Neo</span>
              <span className="text-white">Safe</span>
            </h3>
            <p className="text-gray-400">
              Your trusted service for checking if your personal information has been exposed in data breaches.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/password-security-guide">
                  <span className="text-blue-300 hover:text-blue-100 cursor-pointer">Password Security Guide</span>
                </Link>
              </li>
              <li>
                <Link href="/data-breach-response">
                  <span className="text-blue-300 hover:text-blue-100 cursor-pointer">Data Breach Response</span>
                </Link>
              </li>
              <li>
                <Link href="/security-news">
                  <span className="text-blue-300 hover:text-blue-100 cursor-pointer">Security News</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy">
                  <span className="text-blue-300 hover:text-blue-100 cursor-pointer">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service">
                  <span className="text-blue-300 hover:text-blue-100 cursor-pointer">Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-blue-300 hover:text-blue-100 cursor-pointer">Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} NeoSafe. All rights reserved. This service is 100% free to use.</p>
        </div>
      </div>
    </footer>
  );
}