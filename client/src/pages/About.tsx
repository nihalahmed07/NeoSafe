import React from 'react';
import { Link } from 'wouter';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">About NeoSafe</h1>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              At NeoSafe, our mission is to empower individuals and organizations with the knowledge and tools they need 
              to protect their digital identity. We believe that everyone has a right to know when their personal information 
              has been compromised, and we're committed to making this information accessible, free of charge.
            </p>
            
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="flex-1 bg-blue-50 rounded-lg p-5">
                <h3 className="text-xl font-bold mb-3 text-blue-800">Why We Built NeoSafe</h3>
                <p className="text-gray-700">
                  In today's digital world, data breaches are increasingly common. Yet many people remain unaware when their 
                  personal information has been exposed. We created NeoSafe to bridge this gap, providing a simple, 
                  user-friendly service that allows anyone to check if their data has been compromised.
                </p>
              </div>
              
              <div className="flex-1 bg-blue-50 rounded-lg p-5">
                <h3 className="text-xl font-bold mb-3 text-blue-800">How We're Different</h3>
                <p className="text-gray-700">
                  Unlike many similar services, NeoSafe is completely free to use. We don't require account creation, 
                  and we prioritize your privacy and security above all else. We use advanced cryptographic techniques 
                  to ensure your sensitive information never leaves your device in its original form.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Our Team</h2>
            <p className="text-gray-700 mb-6">
              NeoSafe was created by a team of cybersecurity experts and developers passionate about digital privacy. 
              Our diverse backgrounds in security research, software development, and data protection give us a unique 
              perspective on the challenges of digital security.
            </p>
            
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Our Technology</h2>
            <p className="text-gray-700 mb-6">
              We use a combination of state-of-the-art technologies to provide our service:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold mb-2 text-gray-800">Cryptographic Hashing</h3>
                <p className="text-gray-700">
                  We use SHA-1 cryptographic hashing to convert your personal information into a secure format 
                  that can be checked against our database without exposing your actual data.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold mb-2 text-gray-800">K-Anonymity</h3>
                <p className="text-gray-700">
                  For password checking, we use the k-anonymity model, sending only a partial hash of your password 
                  to our servers. This ensures that your password remains completely private.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold mb-2 text-gray-800">Comprehensive Database</h3>
                <p className="text-gray-700">
                  Our breach database is regularly updated with information from known data breaches, 
                  covering hundreds of millions of exposed records.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold mb-2 text-gray-800">Secure Infrastructure</h3>
                <p className="text-gray-700">
                  Our application is built with security at its core, using modern frameworks and best practices 
                  to ensure the safety of your information throughout the checking process.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-blue-800">Want to check if your data has been compromised?</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Use our free tool to quickly check if your email, phone number, or password has been exposed in known data breaches.
          </p>
          <Link href="/">
            <span className="inline-block cursor-pointer bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Check Your Data Now
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}