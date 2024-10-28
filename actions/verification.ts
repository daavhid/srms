'use server'

import { db } from "@/lib/db"

export const verifyToken = async (token: string | null) => {
    if(!token) {
        return{error:'Missing Token'}
    }
    
    const existingToken = await db.verificationToken.findUnique({
        where: {token}
    })
    console.log(existingToken,'this is from the server')
    if(!existingToken) {
        return {error:'Invalid Token'}
    }
    if(existingToken.expires ) {
        const hasExpired = new Date(existingToken?.expires) < new Date()
        if(hasExpired){
            return {error:'Token Expired'}
        }
    }
    const existingUser =await db.users.findFirst({
        where: {email: existingToken.email}
    })
    if(!existingUser){
        return {error:"Email does not Exist"}
    }
    await db.users.update({
        where:{email: existingToken.email},
        data:{
            emailVerified: new Date(),
            email: existingToken.email,
        }
    })
    await db.verificationToken.delete({
        where:{id: existingToken.id},
    })

    return {success:"Email Confirmed"}

}