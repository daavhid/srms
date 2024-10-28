import NextAuth,{DefaultSession} from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import credentials from "next-auth/providers/credentials"
import { ZodError } from "zod"
import { signInSchema } from "./schemas"
import { db } from "./lib/db"
import bcryptjs from 'bcryptjs'
 
const prisma = new PrismaClient()

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
      user: {
        /** The user's postal address. */
        role: 'STAFF' | 'ADMIN' | 'STUDENT' | 'SUPERADMIN'
        /**
         * By default, TypeScript merges new interface properties and overwrites existing ones.
         * In this case, the default session user properties will be overwritten,
         * with the new ones defined above. To keep the default session user properties,
         * you need to add them back into the newly declared interface.
         */
      } & DefaultSession["user"]
    }
  }
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  events:{
    async linkAccount({user}){
        console.log(user,'this is a event')
        if(user.email){
            await db.users.update({
                where: {email:user.email},
                data: {
                    emailVerified:new Date()
                }
            })
        }
    }
},
  providers:[
    Credentials({
        credentials: {
            email: {},
            password: {},
          },
          authorize:async (credentials)=>{
            try {
              

                    const { email, password } = await signInSchema.parseAsync(credentials)

                    const user = await db.users.findUnique({
                        where:{
                            email:email
                        }
                    })
                    if(!user) return null;
                    const passwordMatch = await bcryptjs.compare(password,user.password)
                    if(passwordMatch) return user;
                
            } catch (error) {
                
            }
          }
    })
  ],callbacks: {
    async jwt({token,user}){
        if (user){
            token.id = user.id
        }
        if(!token.email)return token;
        const existingUser = await db.users.findUnique({
            where:{email:token.email}
        })

        if(!existingUser) return token;
        token.role = existingUser.role;
        token.name = existingUser.username

        return token
    },
    session({ session, token}) {
        if(session.user && token.role){
            session.user.role = token.role as 'STAFF' | 'ADMIN'|'STUDENT' |'SUPERADMIN'
            session.user.name = token.name
            
        }
        console.log(session.user)
        return session
      },
}
})