import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq: React.FC = () => {
  const faqs = [
    {
      question: "What is Neo?",
      answer:
        "Neo is a free service that lets you check if your email address, password, or phone number has been exposed in known data breaches. We provide this service to help individuals take control of their online security and privacy.",
    },
    {
      question: "Is this service really free?",
      answer:
        "Yes, Neo is completely free to use. There are no hidden costs, premium tiers, or advertisements. We believe everyone should have access to information about their data security without any barriers.",
    },
    {
      question: "How does the password checking work?",
      answer:
        "We use a secure method called k-anonymity to check if your password has been exposed in breaches. Your full password is never sent to our servers. Instead, we only send the first 5 characters of a hash of your password. Our server returns a list of hash suffixes that match that prefix, and then your browser checks locally if your password's complete hash is in that list. This means your actual password never leaves your device.",
    },
    {
      question: "Is it safe to enter my password or email?",
      answer:
        "Yes, we've built our service with security and privacy as the top priorities. For emails and phone numbers, we use cryptographic hashing to securely check them against our database. For passwords, we use the k-anonymity model described above, which ensures your password never leaves your device in its original form. We don't store your searches, and all data is transmitted securely.",
    },
    {
      question: "What should I do if my data was found in a breach?",
      answer:
        "If your email, password, or phone number is found in a data breach, we recommend: 1) Change your passwords on the affected sites immediately, 2) Use unique passwords for each site (consider a password manager), 3) Enable two-factor authentication where available, 4) Monitor your accounts for suspicious activity, and 5) Be cautious of phishing attempts that might use your exposed information.",
    },
    {
      question: "Where does your breach data come from?",
      answer:
        "Our breach database is compiled from publicly disclosed data breaches. We gather information about these breaches from public sources, security researchers, and trusted partners. We continuously update our database as new breaches are disclosed.",
    },
    {
      question: "Does a negative result mean I'm completely safe?",
      answer:
        "A negative result means your data wasn't found in our database of known breaches, which is good news. However, it doesn't guarantee complete safety. There could be breaches that haven't been discovered yet or that haven't been added to our database. It's always good practice to maintain strong, unique passwords and enable two-factor authentication where possible.",
    },
    {
      question: "Do you store the data I search for?",
      answer:
        "No, we don't store your email addresses, phone numbers, or passwords after performing searches. Your privacy is important to us, and we only keep anonymized information for service improvement purposes.",
    },
    {
      question: "How often do you update your breach database?",
      answer:
        "We update our breach database regularly as new breaches are discovered and verified. Our goal is to provide the most up-to-date information possible to help you stay informed about your data security.",
    },
    {
      question: "How can I protect myself from future breaches?",
      answer:
        "While you can't prevent data breaches at companies you use, you can minimize the damage by: 1) Using unique, strong passwords for each site, 2) Enabling two-factor authentication, 3) Being cautious about what personal information you share online, 4) Regularly checking for breaches using services like ours, and 5) Promptly changing passwords when breaches are discovered.",
    },
  ];

  return (
    <div className="bg-slate-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions
            </h1>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 pt-6 border-t border-slate-200">
              <p className="text-center text-slate-600">
                Didn't find the answer you were looking for?{" "}
                <a
                  href="/contact"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Contact us
                </a>{" "}
                and we'll be happy to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
