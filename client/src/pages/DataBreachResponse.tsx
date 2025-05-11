import React from 'react';
import { Link } from 'wouter';

export default function DataBreachResponse() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-800">Data Breach Response Guide</h1>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">What to Do If Your Data Has Been Breached</h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-blue-800">Immediate Steps</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li className="text-gray-700">
                    <strong>Change your passwords immediately</strong> - Update passwords for affected accounts and any 
                    accounts where you used the same or similar passwords.
                  </li>
                  <li className="text-gray-700">
                    <strong>Enable two-factor authentication</strong> - Add this extra layer of security to 
                    your important accounts.
                  </li>
                  <li className="text-gray-700">
                    <strong>Monitor your accounts</strong> - Check your financial statements and credit reports 
                    for any suspicious activity.
                  </li>
                  <li className="text-gray-700">
                    <strong>Be alert for phishing attempts</strong> - Watch out for suspicious emails or messages 
                    that might try to exploit the breach situation.
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3">Common Types of Breached Data and Specific Responses</h3>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h4 className="font-bold text-lg">Email Address</h4>
                    <p className="text-gray-700">
                      If your email address was exposed, be extra vigilant about phishing attempts. 
                      Consider setting up email filters and never click suspicious links in emails.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h4 className="font-bold text-lg">Password</h4>
                    <p className="text-gray-700">
                      Change your password immediately and update any other accounts where you used the 
                      same password. Consider using a password manager.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h4 className="font-bold text-lg">Payment Card Information</h4>
                    <p className="text-gray-700">
                      Contact your bank or card issuer, report the card as compromised, and request a new card. 
                      Monitor your statements closely for unauthorized charges.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h4 className="font-bold text-lg">Social Security Number</h4>
                    <p className="text-gray-700">
                      Place a fraud alert or freeze on your credit reports, monitor your credit regularly, 
                      and consider identity theft protection services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Long-Term Protection Strategies</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-800">For Individuals</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Use a password manager to generate and store unique passwords</li>
                  <li>Enable two-factor authentication on all important accounts</li>
                  <li>Regularly check for data breaches affecting your accounts</li>
                  <li>Be cautious about sharing personal information online</li>
                  <li>Keep your devices and software updated</li>
                  <li>Consider using a VPN for additional privacy protection</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-800">For Businesses</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Implement strong data security protocols</li>
                  <li>Train employees on security awareness and phishing prevention</li>
                  <li>Regularly back up important data</li>
                  <li>Develop an incident response plan</li>
                  <li>Consider cyber liability insurance</li>
                  <li>Comply with data protection regulations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-blue-800">Want to Check If Your Data Has Been Breached?</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Use our free breach checking tool to discover if your email, phone number, or password has been exposed.
          </p>
          <Link href="/">
            <a className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Check for Breaches Now
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}