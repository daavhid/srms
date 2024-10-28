// Genrate a token the user will hve in their email
import {v4 as uuidv4} from 'uuid'
import { db } from './db'

export const generateToken = async (email:string) => {
    const token = uuidv4()
    // it calculates the time in milliseconds 
    const expires = new Date(new Date().getTime() + 3600*1000)
    //check if a user has already gotten a token
    const existingUserToken = await db.verificationToken.findFirst({
        where: {
            email
        }
    })
    if(existingUserToken){
        // sow we wnt to delete the record of the user in the database
        await db.verificationToken.delete({
            where:{
                id: existingUserToken.id,
            }
        })
    }
    const verificationToken = db.verificationToken.create({
        data:{
            email,
            token,
            expires
        }
    })
    return verificationToken

}

export const resetPasswordToken = async (email:string) => {
    const token = uuidv4()

    const expires = new Date(new Date().getTime() + 3600*1000)

    const existingUserToken = await db.passwordResetToken.findFirst({
        where:{email}
    })

    if(existingUserToken){
        db.passwordResetToken.delete({
            where:{id:existingUserToken.id},
            
        })
    }

    const resetToken = await db.passwordResetToken.create({
        data:{
            email,
            token,
            expires
        }
    })

    return resetToken


}