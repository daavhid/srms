import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials"
import { db } from "./lib/db"
 
export default { providers: [Credentials],
    
 } satisfies NextAuthConfig