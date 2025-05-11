import React from 'react';
import { Link } from 'wouter';

export default function PasswordSecurityGuide() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-800">Password Security Guide</h1>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Essential Password Security Tips</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="text-xl font-bold mb-2">Use Strong, Unique Passwords</h3>
                <p className="text-gray-700">
                  Create passwords that are at least 12 characters long and include a mix of uppercase letters, 
                  lowercase letters, numbers, and special characters. Avoid using the same password for multiple accounts.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="text-xl font-bold mb-2">Use a Password Manager</h3>
                <p className="text-gray-700">
                  Password managers generate, store, and autofill strong, unique passwords for all your accounts. 
                  You only need to remember one master password.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="text-xl font-bold mb-2">Enable Two-Factor Authentication (2FA)</h3>
                <p className="text-gray-700">
                  Add an extra layer of security by enabling 2FA where available. This requires both your 
                  password and a second factor (such as a code from your phone) to log in.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="text-xl font-bold mb-2">Change Passwords Regularly</h3>
                <p className="text-gray-700">
                  Update your passwords every few months, or immediately if there's a data breach affecting 
                  a service you use.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="text-xl font-bold mb-2">Watch Out for Phishing</h3>
                <p className="text-gray-700">
                  Be cautious of emails, messages, or websites asking for your password or personal information. 
                  Legitimate companies will never ask for your password via email.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">What Makes a Strong Password?</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-bold text-red-700 mb-2">Weak Password Examples</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>password123</li>
                  <li>qwerty</li>
                  <li>123456</li>
                  <li>yourname</li>
                  <li>birthdate</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-700 mb-2">Strong Password Characteristics</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>At least 12 characters long</li>
                  <li>Mix of uppercase and lowercase letters</li>
                  <li>Includes numbers</li>
                  <li>Includes special characters</li>
                  <li>Not based on personal information</li>
                </ul>
              </div>
            </div>
            
            <p className="text-gray-700">
              Consider using a passphrase (a series of random words) with some numbers and special 
              characters for a password that's both strong and memorable.
            </p>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-blue-800">Need to Check If Your Password Has Been Compromised?</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Use our secure password checker to see if your password has appeared in known data breaches.
          </p>
          <Link href="/">
            <a className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Check Your Password Now
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}