import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(inputString: string) {
  return inputString.toLowerCase().replace(/ /g, "-");
}

export function generateUserFallback(name: string) {
  if (!name || name === "") {
    return ""
  }

  if (name.length === 1) {
    return name[0]
  }

  if (name.split(" ").length > 1) {
    const [firstName, lastName] = name.split(" ")
    return `${firstName[0]}${lastName[0]}`
  }

  return name[0]
}