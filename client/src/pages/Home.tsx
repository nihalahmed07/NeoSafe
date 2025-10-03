import React, { useState } from 'react';
import { hashData, hashPasswordForAPI } from "../lib/utils";

// Define result type
interface SearchResult {
  found: boolean;
  count: number;
  breaches?: any[];
}

// Results component
interface ResultsProps {
  type: string;
  value: string;
  result: SearchResult;
}

function Results({ type, value, result }: ResultsProps) {
  if (!result) return null;
  
  return (
    <div>
      {result.found ? (
        <div className="text-center">
          <div className="mb-6">
            <div className="inline-block p-4 bg-red-100 rounded-full">
              <svg className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-2 text-red-600">
            Your data was found in breaches
          </h3>
          
          <div className="my-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-800 mb-2">
              The {type} <span className={`${type !== 'password' ? 'font-medium' : 'font-mono bg-gray-200 px-2 py-1 rounded'}`}>
                {type !== 'password' ? value : '••••••••'}
              </span> was found in:
            </p>
            
            <div className="mt-2 flex items-center justify-center">
              <div className="bg-red-100 text-red-800 text-2xl font-bold rounded-full h-16 w-16 flex items-center justify-center">
                {result.count}
              </div>
              <div className="ml-2 text-left">
                <span className="text-lg font-medium text-gray-700">
                  breach{result.count === 1 ? '' : 'es'}
                </span>
              </div>
            </div>
          </div>
          
          {type !== 'password' && result.breaches && (
            <div className="mb-6">
              <h4 className="font-bold text-gray-700 mb-2">Affected Services:</h4>
              <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
                <ul className="divide-y divide-gray-200">
                  {result.breaches.map((breach: any) => (
                    <li key={breach.id} className="py-3">
                      <div className="flex items-center">
                        <div className="bg-red-50 p-2 rounded-full mr-3">
                          <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold text-gray-700">{breach.title}</p>
                          <p className="text-sm text-gray-500">{breach.breachDate}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          <div className="mt-6 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <h4 className="font-bold text-blue-800 mb-3">What should you do now?</h4>
            <ul className="space-y-2 text-left">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-gray-700">Change your passwords immediately</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-gray-700">Use a unique password for each site</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-gray-700">Enable two-factor authentication where available</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-gray-700">Monitor your accounts for suspicious activity</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="mb-6">
            <div className="inline-block p-4 bg-green-100 rounded-full">
              <svg className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-4 text-green-600">
            Good news! Your data wasn't found in any known breaches
          </h3>
          
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-700">
              The {type} <span className={`${type !== 'password' ? 'font-medium' : 'font-mono bg-gray-200 px-2 py-1 rounded'}`}>
                {type !== 'password' ? value : '••••••••'}
              </span> doesn't appear in our database of known breaches.
            </p>
          </div>
          
          <div className="mt-6 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-lg text-left">
            <h4 className="font-bold text-blue-800 mb-3">Security Best Practices</h4>
            <p className="text-gray-700 mb-4">
              Even though your data wasn't found in any known breaches, it's still important to practice good security habits:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-gray-700">Use strong, unique passwords for each account</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-gray-700">Enable two-factor authentication when available</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-gray-700">Regularly check for data breaches</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');
  
  const handleSearch = async (type: string, value: string) => {
    setIsSearching(true);
    setSearchType(type);
    setSearchValue(value);
    
    try {
      let response;
      
      if (type === 'email') {
        const emailHash = hashData(value);
        response = await fetch(`/api/breach/email/${emailHash}`);
      } 
      else if (type === 'password') {
        const { prefix, suffix } = hashPasswordForAPI(value);
        response = await fetch(`/api/breach/password/${prefix}`);
        const data = await response.json();
        
        // Check if password suffix is in returned list
        if (data.suffixes && data.suffixes.includes(suffix)) {
          const index = data.suffixes.indexOf(suffix);
          const newResult: SearchResult = {
            found: true,
            count: data.counts[index] || 0
          };
          setResult(newResult);
        } else {
          const newResult: SearchResult = {
            found: false,
            count: 0
          };
          setResult(newResult);
        }
        setIsSearching(false);
        return;
      } 
      else if (type === 'phone') {
        const phoneHash = hashData(value);
        response = await fetch(`/api/breach/phone/${phoneHash}`);
      }
      
      if (!response) {
        throw new Error('No response received');
      }
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error searching:', error);
      setResult(null);
    } finally {
      setIsSearching(false);
    }
  };
  
  const resetSearch = () => {
    setResult(null);
    setSearchType('');
    setSearchValue('');
  };
  
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-800 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            Protect Your Digital Identity
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            NeoSafe helps you discover if your personal data has been exposed in security breaches.
            Check your email, password, or phone number for free.
          </p>
          
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-3xl mx-auto">
            <div className="bg-blue-800 p-4 rounded-lg shadow-lg">
              <div className="text-3xl font-bold">500M+</div>
              <div className="text-blue-200">Records in Database</div>
            </div>
            <div className="bg-blue-800 p-4 rounded-lg shadow-lg">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-blue-200">Free to Use</div>
            </div>
            <div className="bg-blue-800 p-4 rounded-lg shadow-lg">
              <div className="text-3xl font-bold">100K+</div>
              <div className="text-blue-200">Daily Searches</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {!result ? (
            <div>
              <div className="bg-white p-1">
                <ul className="flex border-b">
                  <li className="flex-1 text-center">
                    <button 
                      onClick={() => setActiveTab('email')}
                      className={`py-3 px-4 w-full ${activeTab === 'email' 
                        ? 'border-b-2 border-blue-500 text-blue-700 font-medium' 
                        : 'text-gray-500 hover:text-blue-500'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </button>
                  </li>
                  <li className="flex-1 text-center">
                    <button 
                      onClick={() => setActiveTab('password')}
                      className={`py-3 px-4 w-full ${activeTab === 'password' 
                        ? 'border-b-2 border-blue-500 text-blue-700 font-medium' 
                        : 'text-gray-500 hover:text-blue-500'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Password
                    </button>
                  </li>
                  <li className="flex-1 text-center">
                    <button 
                      onClick={() => setActiveTab('phone')}
                      className={`py-3 px-4 w-full ${activeTab === 'phone' 
                        ? 'border-b-2 border-blue-500 text-blue-700 font-medium' 
                        : 'text-gray-500 hover:text-blue-500'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Phone
                    </button>
                  </li>
                </ul>
              </div>
              
              <div className="p-6">
                {activeTab === 'email' && (
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Enter your email address:
                    </label>
                    <div className="relative mb-4">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <input 
                        type="email" 
                        className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                      />
                    </div>
                    <button 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium shadow hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-transform transform hover:scale-[1.02]"
                      onClick={() => handleSearch('email', email)}
                      disabled={!email || isSearching}
                    >
                      {isSearching ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Searching...
                        </span>
                      ) : 'Check for Breaches'}
                    </button>
                  </div>
                )}
                
                {activeTab === 'password' && (
                  <div>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-blue-700">
                            Your password is never sent to our servers. We use a secure k-anonymity method 
                            that only sends a partial hash of your password.
                          </p>
                        </div>
                      </div>
                    </div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Enter a password to check:
                    </label>
                    <div className="relative mb-4">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input 
                        type="password" 
                        className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password to check"
                      />
                    </div>
                    <button 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium shadow hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-transform transform hover:scale-[1.02]"
                      onClick={() => handleSearch('password', password)}
                      disabled={!password || isSearching}
                    >
                      {isSearching ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Checking Securely...
                        </span>
                      ) : 'Check Password Safely'}
                    </button>
                  </div>
                )}
                
                {activeTab === 'phone' && (
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Enter your phone number:
                    </label>
                    <div className="relative mb-2">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <input 
                        type="tel" 
                        className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mb-4">
                      Include country code (e.g., +1 for US)
                    </p>
                    <button 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium shadow hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-transform transform hover:scale-[1.02]"
                      onClick={() => handleSearch('phone', phone)}
                      disabled={!phone || isSearching}
                    >
                      {isSearching ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Searching...
                        </span>
                      ) : 'Check for Breaches'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-6">
              <Results type={searchType} value={searchValue} result={result} />
              <button 
                onClick={resetSearch}
                className="mt-6 w-full bg-gray-200 py-3 px-4 rounded-lg text-gray-700 font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-transform transform hover:scale-[1.02]"
              >
                Search Again
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Understanding Data Breaches
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">What is a data breach?</h3>
              <p className="text-gray-600">
                A data breach occurs when a cybercriminal successfully infiltrates a data source
                and extracts sensitive information. This can be done by accessing a computer system
                or network to steal personal data from a company's database.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">How We Keep Your Searches Safe</h3>
              <p className="text-gray-600">
                We use cryptographic hashing and k-anonymity to securely check your data.
                Your passwords never leave your device in their original form, and we don't
                store any of your personal information after the search is complete.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Regular Monitoring</h3>
              <p className="text-gray-600">
                Data breaches happen regularly. We recommend checking your information 
                periodically to ensure you stay informed about potential security risks 
                that might affect your accounts and personal data.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Take Control of Your Digital Security</h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto mb-8">
            Start protecting your online accounts today by checking if your data has been compromised.
          </p>
          <a 
            href="/password-security-guide" 
            className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Learn More About Password Security
          </a>
        </div>
      </div>
    </>
  );
}