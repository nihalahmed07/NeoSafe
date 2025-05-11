import React from "react";
import { Link } from "wouter";
import { ShieldCheck } from "lucide-react";
import { Facebook, Twitter, Github } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <ShieldCheck className="text-primary/90 h-6 w-6 mr-2" />
              <h3 className="text-xl font-bold text-white">Neo</h3>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              A free service to check if your personal data has been exposed in
              data breaches.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-slate-400 hover:text-primary/90 transition-colors">
                  Privacy Guide
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-primary/90 transition-colors">
                  Password Security
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-primary/90 transition-colors">
                  Two-Factor Authentication
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-primary/90 transition-colors">
                  Data Breach Response
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about">
                  <a className="text-slate-400 hover:text-primary/90 transition-colors">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <a className="text-slate-400 hover:text-primary/90 transition-colors">
                  Our Team
                </a>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-slate-400 hover:text-primary/90 transition-colors">
                    Blog
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-slate-400 hover:text-primary/90 transition-colors">
                    Contact
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-slate-400 hover:text-primary/90 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-primary/90 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-primary/90 transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-primary/90 transition-colors">
                  GDPR Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-700 text-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Neo. All rights reserved. This service is 100% free to use.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
