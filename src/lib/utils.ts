import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}


export function toUrlFriendlyString(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, '');    // Trim leading and trailing hyphens
}