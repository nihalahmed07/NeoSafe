import React from 'react';
import { Switch, Route } from 'wouter';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Faq from './pages/Faq';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import PasswordSecurityGuide from './pages/PasswordSecurityGuide';
import DataBreachResponse from './pages/DataBreachResponse';
import SecurityNews from './pages/SecurityNews';
import ArticleDetail from './pages/ArticleDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/not-found';

// Import components
import SimpleHeader from './components/SimpleHeader';
import SimpleFooter from './components/SimpleFooter';

// Router component
export default function Router() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SimpleHeader />
      
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/faq" component={Faq} />
          <Route path="/blog" component={Blog} />
          <Route path="/contact" component={Contact} />
          <Route path="/password-security-guide" component={PasswordSecurityGuide} />
          <Route path="/data-breach-response" component={DataBreachResponse} />
          <Route path="/security-news" component={SecurityNews} />
          <Route path="/security-news/article/:id" component={ArticleDetail} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms-of-service" component={TermsOfService} />
          <Route component={NotFound} />
        </Switch>
      </main>
      
      <SimpleFooter />
    </div>
  );
}