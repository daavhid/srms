'use server'
import { db } from "@/lib/db";
import { sendResetToken } from "@/lib/mail";
import { resetPasswordToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas";
import { z } from "zod";


export const reset = async(values:z.infer<typeof ResetSchema>)=>{
    const validatedField = ResetSchema.safeParse(values)

    if(!validatedField.success){
        return {error:'Invalid Field'}
    }

    const existingUser = await db.users.findFirst({
        where: {email: validatedField.data.email}
    })

    if(!existingUser){
        return {error:'Email Does Not Exixts'}
    }

    // Todo Generate Token and Send Email
    const resetToken = await resetPasswordToken(validatedField.data.email)
    await sendResetToken(
        resetToken.email,
        resetToken.token  as string  )

    return {success:'Password Reset Link Sent'}
}