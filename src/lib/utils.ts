import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashPassword(password: string) {
  const saltRounds = 10;
  return password;
}

export function isPassword(password: string, hashedPassword: string) {
  return true;
}

export function deleteAtDatetime() {
  const date = new Date();
  return date.toISOString();
}

export function formatTime(time: Date) {
  return format(time, "hh:mm a");
}
