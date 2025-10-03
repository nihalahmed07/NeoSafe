import React, { useState } from 'react';
import { Link } from 'wouter';

export default function SecurityNews() {
  const [subscriptionEmail, setSubscriptionEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  
  // Email validation function
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  // Handle subscription
  const handleSubscribe = async () => {
    if (!isValidEmail(subscriptionEmail)) return;
    
    setIsSubscribing(true);
    
    try {
      // In a production environment, replace this URL with your actual Google Apps Script Web App URL
      // const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
      
      // For demonstration purposes, we're simulating the API call
      // In production, uncomment the following code and use your actual Script URL:
      
      /*
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ email: subscriptionEmail }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Error subscribing');
      }
      */
      
      // Simulate API call with timeout (remove this in production)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Subscription data:', {
        email: subscriptionEmail,
        timestamp: new Date().toISOString()
      });
      
      setSubscriptionSuccess(true);
      // Reset the form
      setSubscriptionEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('There was an error subscribing. Please try again later.');
    } finally {
      setIsSubscribing(false);
    }
  };
  
  // In a real app, these would come from an API or CMS
  const newsArticles = [
    {
      id: 1,
      title: "Major Data Breach Affects 500,000 Users",
      date: "May 8, 2025",
      summary: "A popular social media platform disclosed a data breach affecting approximately 500,000 users. Exposed information includes email addresses and hashed passwords.",
      category: "Breach Alert"
    },
    {
      id: 2,
      title: "New Phishing Campaign Targets Banking Customers",
      date: "May 5, 2025",
      summary: "Security researchers have identified a sophisticated phishing campaign targeting customers of major banks. The emails mimic legitimate bank communications and attempt to steal login credentials.",
      category: "Threat Warning"
    },
    {
      id: 3,
      title: "Critical Security Update Released for Popular Browser",
      date: "April 30, 2025",
      summary: "Developers have released an urgent security patch for a widely used web browser, fixing a vulnerability that could allow remote code execution. Users are advised to update immediately.",
      category: "Security Update"
    },
    {
      id: 4,
      title: "Study Shows Rise in Ransomware Attacks Against Small Businesses",
      date: "April 28, 2025",
      summary: "A new cybersecurity report reveals a 40% increase in ransomware attacks targeting small businesses in the first quarter of 2025. The report highlights the importance of regular backups and security training.",
      category: "Research"
    },
    {
      id: 5,
      title: "Government Issues New Data Protection Guidelines",
      date: "April 25, 2025",
      summary: "Federal agencies have released updated guidelines for data protection and privacy. The new framework includes stricter requirements for organizations handling sensitive personal information.",
      category: "Regulation"
    },
    {
      id: 6,
      title: "Password Manager Service Strengthens Security Features",
      date: "April 20, 2025",
      summary: "A leading password manager service has announced enhanced security features, including improved encryption standards and additional authentication options for users.",
      category: "Product News"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-blue-800">Security News</h1>
        <p className="text-gray-600 mb-8">Stay informed about the latest cybersecurity threats, breaches, and best practices</p>
        
        <div className="grid grid-cols-1 gap-8">
          {newsArticles.map(article => (
            <div key={article.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    article.category === 'Breach Alert' ? 'bg-red-100 text-red-800' :
                    article.category === 'Threat Warning' ? 'bg-yellow-100 text-yellow-800' :
                    article.category === 'Security Update' ? 'bg-blue-100 text-blue-800' :
                    article.category === 'Research' ? 'bg-purple-100 text-purple-800' :
                    article.category === 'Regulation' ? 'bg-gray-100 text-gray-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {article.category}
                  </span>
                  <span className="text-gray-500 text-sm">{article.date}</span>
                </div>
                
                <h2 className="text-xl font-bold mb-3 text-gray-800">{article.title}</h2>
                <p className="text-gray-600">{article.summary}</p>
                
                <Link href={`/security-news/article/${article.id}`}>
                  <span className="mt-4 text-blue-600 font-medium hover:text-blue-800 transition-colors inline-flex items-center cursor-pointer">
                    Read full article
                    <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Get Security Alerts</h2>
          <p className="text-gray-700 mb-4">
            Subscribe to our security alert service to receive timely notifications about data breaches that might affect you.
          </p>
          
          {subscriptionSuccess ? (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    Thanks for subscribing! We'll keep you updated about the latest security threats and data breaches.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                value={subscriptionEmail}
                onChange={(e) => setSubscriptionEmail(e.target.value)}
                placeholder="Enter your email" 
                className="flex-grow p-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
              />
              <button 
                onClick={handleSubscribe}
                disabled={!isValidEmail(subscriptionEmail) || isSubscribing}
                className={`bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap ${
                  !isValidEmail(subscriptionEmail) || isSubscribing ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubscribing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </span>
                ) : 'Subscribe'}
              </button>
            </div>
          )}
          
          <p className="text-xs text-gray-500 mt-2">
            We respect your privacy and will only send relevant security alerts. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}