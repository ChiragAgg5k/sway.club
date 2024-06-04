import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Roles } from "@/types/globals";
import { auth } from "@clerk/nextjs/server";

export const checkRole = (role: Roles) => {
  const { sessionClaims } = auth();

  return sessionClaims?.metadata.role === role;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
