import { BreachSearchResult, PasswordCheckResult, PhoneSearchResult } from "@shared/schema";
import { hashData, hashPasswordForAPI } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";

/**
 * Search for breaches by email address
 */
export async function searchBreachesByEmail(email: string): Promise<BreachSearchResult> {
  const emailHash = hashData(email);
  const response = await apiRequest("GET", `/api/breach/email/${emailHash}`, undefined);
  return await response.json();
}

/**
 * Search for breaches by phone number
 */
export async function searchBreachesByPhone(phone: string): Promise<PhoneSearchResult> {
  const phoneHash = hashData(phone);
  const response = await apiRequest("GET", `/api/breach/phone/${phoneHash}`, undefined);
  return await response.json();
}

/**
 * Check if a password has been exposed in breaches
 * Uses k-anonymity pattern (only send first 5 chars of the hash)
 */
export async function checkPasswordBreach(password: string): Promise<PasswordCheckResult> {
  const { prefix, suffix } = hashPasswordForAPI(password);
  
  // Only send the prefix to the server
  const response = await apiRequest("GET", `/api/breach/password/${prefix}`, undefined);
  const data = await response.json();
  
  // Check locally if our suffix is in the returned list
  if (data.suffixes && data.suffixes.includes(suffix)) {
    const index = data.suffixes.indexOf(suffix);
    return {
      found: true,
      count: data.counts[index] || 0
    };
  }
  
  return {
    found: false,
    count: 0
  };
}
