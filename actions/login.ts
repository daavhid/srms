'use server'

import { signIn } from "@/auth"
import { db } from "@/lib/db"
import { sendVerificationToken } from "@/lib/mail"
import { generateToken } from "@/lib/tokens"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { signInSchema } from "@/schemas"
import { error } from "console"
import { AuthError } from "next-auth"
import * as z from "zod"

export const login  = async(values:z.infer<typeof signInSchema>)=>{
    const validatedSchema =   signInSchema.safeParse(values)

    if(!validatedSchema.success){
        return {error:'Invalid fields'}
    }
    const {email,password} = validatedSchema.data

    const existingUser = await db.users.findUnique({
        where: {email:email},
    })
    console.log(existingUser,'thi is existing user')
    if(!existingUser || !existingUser.email || !existingUser.password){

        return {error: 'email does not exist'}
    }
    if(!existingUser.emailVerified){
        const verificationToken= await generateToken(existingUser.email);
        await sendVerificationToken(
            verificationToken.email,
            verificationToken.token as string
        )
        return {success:'confirmation email sent'}

    }
    try {
        await signIn('credentials',{
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
        
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        } 
        throw error ; 
        
    }
}