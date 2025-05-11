import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Privacy Policy</h1>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <p className="text-gray-600 mb-6">
              Last updated: May 10, 2025
            </p>
            
            <div className="space-y-6 text-gray-700">
              <div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">1. Introduction</h2>
                <p>
                  Welcome to NeoSafe. We respect your privacy and are committed to protecting your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">2. Information We Collect</h2>
                <h3 className="font-bold mb-2">Information You Provide</h3>
                <p className="mb-3">
                  We collect information that you voluntarily provide when using our service, such as:
                </p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li>Email addresses, phone numbers, and password hashes that you submit to check for breaches</li>
                  <li>Information you provide when contacting us</li>
                  <li>Information you provide when creating an account (if applicable)</li>
                </ul>
                
                <h3 className="font-bold mb-2">Information Automatically Collected</h3>
                <p className="mb-3">
                  When you use our service, we may automatically collect certain information, including:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Usage data</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">3. How We Use Your Information</h2>
                <p className="mb-3">
                  We use the information we collect for various purposes, including to:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Check if your information appears in known data breaches</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Monitor and analyze usage patterns and trends</li>
                  <li>Protect against, identify, and prevent fraud and other illegal activities</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">4. Security of Your Information</h2>
                <p className="mb-3">
                  We implement appropriate security measures to protect your information:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Password data is never stored or transmitted in its original form; we use secure hashing techniques and k-anonymity</li>
                  <li>We use encryption to protect sensitive information transmitted online</li>
                  <li>We employ secure databases and infrastructure</li>
                  <li>We regularly review our security practices</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">5. Sharing Your Information</h2>
                <p className="mb-3">
                  We do not sell or rent your personal information to third parties. We may share information in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>With service providers who perform services on our behalf</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect and defend our rights and property</li>
                  <li>With your consent or at your direction</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">6. Your Choices</h2>
                <p className="mb-3">
                  You have certain choices regarding your information:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>You can choose not to provide information, although this may limit your ability to use certain features</li>
                  <li>You can request information about what data we have about you</li>
                  <li>You can request deletion of your account and associated data (if applicable)</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">7. Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">8. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at privacy@neosafe.com.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}