import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merge utility classes without duplicating conflicting Tailwind tokens.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}