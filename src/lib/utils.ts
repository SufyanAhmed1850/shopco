import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with shadcn-style precedence. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as a whole-dollar price, e.g. 145 -> "$145". */
export function formatPrice(value: number): string {
  return `$${value}`;
}
