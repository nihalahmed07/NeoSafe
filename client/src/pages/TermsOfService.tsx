import React from 'react';

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Terms of Service</h1>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <p className="text-gray-600 mb-6">
              Last updated: May 10, 2025
            </p>
            
            <div className="space-y-6 text-gray-700">
              <div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using the NeoSafe service, you agree to be bound by these Terms of Service. 
                  If you do not agree to all the terms and conditions, you may not access or use the service.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">2. Description of Service</h2>
                <p>
                  NeoSafe is a free service that allows users to check if their email addresses, phone numbers, 
                  or passwords have been exposed in known data breaches. The service uses cryptographic techniques 
                  to securely check this information without transmitting sensitive data in its original form.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">3. User Responsibilities</h2>
                <p className="mb-3">
                  As a user of NeoSafe, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide accurate information when using our service</li>
                  <li>Use the service only for lawful purposes</li>
                  <li>Not attempt to bypass or circumvent any security measures</li>
                  <li>Not use the service to collect or harvest information about other users</li>
                  <li>Not use automated systems or software to extract data from the service</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">4. Intellectual Property</h2>
                <p>
                  The NeoSafe service, including all content, features, and functionality, is owned by NeoSafe 
                  and is protected by copyright, trademark, and other intellectual property laws. You may not 
                  reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, 
                  republish, download, store, or transmit any materials from our service without our consent.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">5. Disclaimer of Warranties</h2>
                <p>
                  THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, 
                  EITHER EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, TIMELY, 
                  SECURE, OR ERROR-FREE. WE DO NOT WARRANT THAT THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF 
                  THE SERVICE WILL BE ACCURATE OR RELIABLE.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">6. Limitation of Liability</h2>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL NEOSAFE, ITS AFFILIATES, 
                  OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR 
                  DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF 
                  THE SERVICE.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">7. Indemnification</h2>
                <p>
                  You agree to defend, indemnify, and hold harmless NeoSafe, its affiliates, licensors, and service 
                  providers, and its and their respective officers, directors, employees, contractors, agents, licensors, 
                  suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, 
                  losses, costs, expenses, or fees arising out of or relating to your violation of these Terms of Service.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">8. Changes to Terms of Service</h2>
                <p>
                  We may revise and update these Terms of Service from time to time at our sole discretion. All changes 
                  are effective immediately when we post them. Your continued use of the service following the posting 
                  of revised Terms of Service means that you accept and agree to the changes.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">9. Governing Law</h2>
                <p>
                  These Terms of Service shall be governed by and construed in accordance with the laws of 
                  the jurisdiction in which NeoSafe operates, without regard to its conflict of law principles.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">10. Contact Us</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us at terms@neosafe.com.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}