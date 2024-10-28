    'use server'
import { db } from "@/lib/db";
import bcryptJs from 'bcryptjs'
import { newPasswordSchema } from "@/schemas";
import * as z from 'zod'

export const newPassword = async(values:z.infer<typeof newPasswordSchema>,token:string | null)=>{
    const validatedField = newPasswordSchema.safeParse(values)



    if(!validatedField.success){
        return {error:'something went wrong'}
    }
    if(!token){
        return {error:"missing Token"}
    }
    const existingToken = await db.passwordResetToken.findUnique({
        where: {token}
    })
    if(!existingToken){

        return {error:'Token is not valid'}
    }
    
    const hasExpired=  new Date(existingToken.expires!) < new Date()
    if(hasExpired){
        return {error:'Token has expired'}
    }

    const existingUser = db.users.findFirst({
        where: {email: existingToken.email}
    })

    if(!existingUser){
        return {error:"Email does not exists"}
    }   

    const hashedPassword = await bcryptJs.hash(validatedField.data.password,10)

    await db.users.update({
        where:{email: existingToken.email},
        data:{
            password:hashedPassword
        }
    })

    await db.passwordResetToken.delete({
        where:{id:existingToken.id},
    })

    return {success:'Password Updated'}


}