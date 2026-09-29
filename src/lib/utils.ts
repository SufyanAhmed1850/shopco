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

/** Prefix a public asset path with the Vite base URL so the app works under a subpath. */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${path.replace(/^\/+/, "")}`;
}
