import React from "react";
import { HelpCircle, AlertTriangle, Shield, Lock, DollarSign } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const BreachExplanation: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Understanding Data Breaches
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="flex items-start mb-4">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <HelpCircle className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">
                  What is a data breach?
                </h3>
              </div>
              <p className="text-slate-600 text-sm">
                A data breach occurs when a cybercriminal successfully
                infiltrates a data source and extracts sensitive information.
                This can be done by accessing a computer system or network to
                steal the personal data of customers from a company's database.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="flex items-start mb-4">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Why should I care?
                </h3>
              </div>
              <p className="text-slate-600 text-sm">
                When your data is exposed in a breach, it can be used for
                identity theft, financial fraud, and unauthorized access to your
                accounts. Criminals can use your personal information to open
                credit cards, take out loans, or even commit crimes in your name.
              </p>
            </div>
          </div>

          <Separator className="my-8" />

          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            How We Keep Your Searches Safe
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 p-4 inline-block rounded-full mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">
                Secure Password Checking
              </h3>
              <p className="text-slate-600 text-sm">
                We use k-anonymity to check your password without ever receiving
                your actual password data.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 p-4 inline-block rounded-full mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">
                No Data Storage
              </h3>
              <p className="text-slate-600 text-sm">
                We don't store your email, password or phone data after
                performing the search.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 p-4 inline-block rounded-full mb-4">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">
                100% Free Service
              </h3>
              <p className="text-slate-600 text-sm">
                Our breach checking service is completely free with no hidden
                costs or premium tiers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreachExplanation;
