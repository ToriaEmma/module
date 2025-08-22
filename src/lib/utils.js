import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Combine class names safely: merges Tailwind classes to avoid conflicts
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
