import { auth } from "@/auth"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const serverRole = async()=>{
    const data = await auth()
    return data?.user.role
}

export const CurrentUser =async ()=>{
    const user = await auth()
    return user?.user
}