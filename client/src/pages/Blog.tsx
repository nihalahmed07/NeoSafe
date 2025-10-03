import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Data Breaches: Types, Causes and Prevention",
    excerpt: "Data breaches can occur in various forms and for different reasons. Learn about the most common types of data breaches, what causes them, and steps you can take to prevent them.",
    date: "2023-05-15",
    author: "Alex Johnson",
    readTime: "8 min read",
    category: "Security Basics",
  },
  {
    id: 2,
    title: "The K-Anonymity Model: How We Check Passwords Securely",
    excerpt: "Our password checking service uses the k-anonymity model to ensure your passwords never leave your device. Dive into how this cryptographic technique works and why it's important for your privacy.",
    date: "2023-06-02",
    author: "Samantha Lee",
    readTime: "6 min read",
    category: "Technical",
  },
  {
    id: 3,
    title: "What To Do After a Data Breach: A Step-by-Step Guide",
    excerpt: "Finding out your data has been exposed in a breach can be stressful. Follow our comprehensive guide on what immediate steps to take to secure your accounts and minimize potential damage.",
    date: "2023-07-10",
    author: "Michael Chen",
    readTime: "10 min read",
    category: "Practical Advice",
  },
  {
    id: 4,
    title: "The Psychology of Passwords: Why We Choose Weak Ones",
    excerpt: "Despite knowing the risks, many people continue to use weak, easily-guessable passwords. Explore the psychological factors that influence our password choices and how to overcome them.",
    date: "2023-08-21",
    author: "Dr. Emma Watson",
    readTime: "7 min read",
    category: "Psychology",
  },
  {
    id: 5,
    title: "Two-Factor Authentication Explained: Beyond Passwords",
    excerpt: "Passwords alone aren't enough to protect your accounts. Learn how two-factor authentication works, the different types available, and why it's an essential layer of security in today's digital world.",
    date: "2023-09-05",
    author: "Thomas Rodriguez",
    readTime: "9 min read",
    category: "Security Tips",
  },
  {
    id: 6,
    title: "The Biggest Data Breaches of 2023 (So Far)",
    excerpt: "A review of the most significant data breaches that have occurred this year, what data was exposed, how many users were affected, and what lessons we can learn from these incidents.",
    date: "2023-10-12",
    author: "Alex Johnson",
    readTime: "12 min read",
    category: "News",
  },
];

const Blog: React.FC = () => {
  return (
    <div className="bg-slate-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Neo Blog</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Expert insights, practical advice, and the latest news on data breaches, 
              online security, and protecting your digital identity.
            </p>
          </header>
          
          <div className="grid gap-8 sm:grid-cols-2">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600">
                    {post.excerpt}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t pt-4">
                  <div className="text-sm text-slate-500">
                    <span>By {post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Read Article
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button variant="outline">
              Load More Articles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
