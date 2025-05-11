import { type ClassValue, clsx } from "clsx";
import crypto from 'crypto-js';

// Simplified version without tailwind-merge dependency
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Function to hash data (email, phone) for secure transmission
export function hashData(data: string): string {
  return crypto.SHA1(data.trim().toLowerCase()).toString();
}

// Function to hash password and get prefix for k-anonymity
export function hashPasswordForAPI(password: string): { 
  prefix: string, 
  suffix: string 
} {
  const fullHash = crypto.SHA1(password).toString().toUpperCase();
  const prefix = fullHash.substring(0, 5);
  const suffix = fullHash.substring(5);
  
  return { prefix, suffix };
}

// Format phone number for display
export function formatPhoneNumber(phone: string): string {
  // Basic phone formatting - can be expanded for different country codes
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6, 10)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.substring(1, 4)}) ${cleaned.substring(4, 7)}-${cleaned.substring(7, 11)}`;
  }
  
  // Return with + if it seems to be an international number
  if (phone.startsWith('+')) {
    return phone;
  }
  
  return cleaned;
}

// Format date from ISO string
export function formatDate(dateString: string): string {
  try {
    // Support both full ISO dates and year-month
    const date = dateString.includes('-') 
      ? new Date(dateString)
      : new Date(`${dateString}-01`);
      
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long',
    }).format(date);
  } catch(e) {
    return dateString;
  }
}

// Format number with commas (e.g. 1,000,000)
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
