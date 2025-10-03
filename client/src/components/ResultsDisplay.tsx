import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, AlertTriangle, CheckCircle, CheckIcon, Database } from "lucide-react";
import { Breach, BreachSearchResult, PasswordCheckResult, PhoneSearchResult } from "@shared/schema";
import { formatDate, formatNumber } from "@/lib/utils";

interface ResultsDisplayProps {
  searchType: "email" | "password" | "phone";
  searchValue: string;
  loading: boolean;
  result: BreachSearchResult | PasswordCheckResult | PhoneSearchResult | null;
  onSearchAgain: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  searchType,
  searchValue,
  loading,
  result,
  onSearchAgain,
}) => {
  if (!result && !loading) return null;

  if (loading) {
    return (
      <section className="py-8 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-slate-600">Searching securely for breaches...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // For password results which have a different structure
  if (searchType === "password") {
    const passwordResult = result as PasswordCheckResult;
    
    return (
      <section className="py-8 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className={`p-4 ${passwordResult.found ? 'bg-destructive' : 'bg-success-500'}`}>
                <div className="flex items-center">
                  {passwordResult.found ? (
                    <AlertCircle className="text-white mr-3 h-6 w-6" />
                  ) : (
                    <CheckCircle className="text-white mr-3 h-6 w-6" />
                  )}
                  <h2 className="text-white text-lg font-semibold">
                    {passwordResult.found
                      ? "Oh no! This password has been exposed in data breaches"
                      : "Good news! This password wasn't found in any known breaches"}
                  </h2>
                </div>
              </div>

              <div className="p-6">
                {passwordResult.found ? (
                  <>
                    <p className="text-slate-700 mb-6">
                      This password has been found in{" "}
                      <span className="font-bold text-destructive">
                        {formatNumber(passwordResult.count)} data breaches
                      </span>
                      . This password is known to have been exposed in data breaches and should not be used.
                    </p>

                    <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
                      <h3 className="font-medium text-amber-800 mb-2 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />
                        What should you do now?
                      </h3>
                      <ul className="text-sm text-amber-700 space-y-2">
                        <li className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-amber-600 mt-0.5 mr-2" />
                          <span>Stop using this password immediately on all accounts</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-amber-600 mt-0.5 mr-2" />
                          <span>Create a unique, strong password for each of your accounts</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-amber-600 mt-0.5 mr-2" />
                          <span>Enable two-factor authentication wherever available</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-amber-600 mt-0.5 mr-2" />
                          <span>Consider using a password manager to generate and store strong passwords</span>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-slate-700 mb-6">
                      The password you checked doesn't appear in our database of known breaches. This is good news, but you should still practice good security habits.
                    </p>

                    <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                      <h3 className="font-medium text-green-800 mb-2 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Stay secure with these tips:
                      </h3>
                      <ul className="text-sm text-green-700 space-y-2">
                        <li className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-green-600 mt-0.5 mr-2" />
                          <span>Use strong, unique passwords for each account</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-green-600 mt-0.5 mr-2" />
                          <span>Enable two-factor authentication when available</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-green-600 mt-0.5 mr-2" />
                          <span>Regularly check for breaches with our free tool</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-green-600 mt-0.5 mr-2" />
                          <span>Keep your software and devices updated</span>
                        </li>
                      </ul>
                    </div>
                  </>
                )}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={onSearchAgain}
                >
                  Check Another
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // For email and phone results
  const breachResult = result as BreachSearchResult;
  const displayValue = searchType === "email" ? searchValue : searchValue;

  return (
    <section className="py-8 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className={`p-4 ${breachResult.found ? 'bg-destructive' : 'bg-success-500'}`}>
              <div className="flex items-center">
                {breachResult.found ? (
                  <AlertCircle className="text-white mr-3 h-6 w-6" />
                ) : (
                  <CheckCircle className="text-white mr-3 h-6 w-6" />
                )}
                <h2 className="text-white text-lg font-semibold">
                  {breachResult.found
                    ? "Oh no! Your data was found in breaches"
                    : "Good news! Your data wasn't found in any known breaches"}
                </h2>
              </div>
            </div>

            <div className="p-6">
              {breachResult.found ? (
                <>
                  <p className="text-slate-700 mb-6">
                    The {searchType}{" "}
                    <span className="font-medium">{displayValue}</span> was found in{" "}
                    <span className="font-bold text-destructive">
                      {breachResult.count} data {breachResult.count === 1 ? "breach" : "breaches"}
                    </span>
                    . Here are the details:
                  </p>

                  {breachResult.breaches.map((breach) => (
                    <div
                      key={breach.id}
                      className="mb-6 border border-slate-200 rounded-lg overflow-hidden"
                    >
                      <div className="flex items-center p-4 border-b border-slate-200 bg-slate-50">
                        <div className="w-10 h-10 bg-slate-200 flex-shrink-0 rounded-md flex items-center justify-center mr-3">
                          <Database className="h-5 w-5 text-slate-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800">{breach.title}</h3>
                          <p className="text-sm text-slate-500">{formatDate(breach.breachDate)}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-slate-600 mb-3">
                          The breach exposed the following data:
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {breach.dataClasses.map((dataClass, index) => (
                            <Badge
                              key={index}
                              variant="breach"
                              className="text-xs"
                            >
                              {dataClass}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500">
                          {breach.description}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
                    <h3 className="font-medium text-amber-800 mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />
                      What should you do now?
                    </h3>
                    <ul className="text-sm text-amber-700 space-y-2">
                      <li className="flex items-start">
                        <CheckIcon className="h-4 w-4 text-amber-600 mt-0.5 mr-2" />
                        <span>Change your passwords immediately on the affected services</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-4 w-4 text-amber-600 mt-0.5 mr-2" />
                        <span>Enable two-factor authentication where available</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-4 w-4 text-amber-600 mt-0.5 mr-2" />
                        <span>Use a unique password for each online account</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-4 w-4 text-amber-600 mt-0.5 mr-2" />
                        <span>Consider using a password manager to generate and store strong passwords</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-slate-700 mb-6">
                    The {searchType} you provided doesn't appear in our database of known breaches. This is good news, but you should still practice good security habits.
                  </p>

                  <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                    <h3 className="font-medium text-green-800 mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      Stay secure with these tips:
                    </h3>
                    <ul className="text-sm text-green-700 space-y-2">
                      <li className="flex items-start">
                        <CheckIcon className="h-4 w-4 text-green-600 mt-0.5 mr-2" />
                        <span>Use strong, unique passwords for each account</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-4 w-4 text-green-600 mt-0.5 mr-2" />
                        <span>Enable two-factor authentication when available</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-4 w-4 text-green-600 mt-0.5 mr-2" />
                        <span>Regularly check for breaches with our free tool</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-4 w-4 text-green-600 mt-0.5 mr-2" />
                        <span>Keep your software and devices updated</span>
                      </li>
                    </ul>
                  </div>
                </>
              )}

              <Button
                variant="outline"
                className="w-full"
                onClick={onSearchAgain}
              >
                Check Another
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsDisplay;
