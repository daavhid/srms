import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server";
import { db } from '@/lib/db';
import { generateToken } from '@/lib/tokens';
import { sendVerificationToken } from '@/lib/mail';



export  async function POST(req:NextRequest,res:NextResponse){
    const {username,password,email} = await req.json()
    const hashPassword = await bcryptjs.hash(password,10) 
    try{
        const userExist = await db.users.findUnique({
            where:{
                email:email
            }
        })
        if(userExist){
            return NextResponse.json({message:'User already exists'},{status:405})
        }
        await db.users.create({
            data:{
                username:username,
                email:email,
                password:hashPassword,
            }
        })

        //generate token for new users to confirm their email
        const verificationToken = await generateToken(email)
        await sendVerificationToken(
            verificationToken.email,
            verificationToken.token as string
        )
        console.log({username,password,email})
        return NextResponse.json({message:'verification token sent to email'},{status:201})

    }catch(error){
        console.log('error occured while registering User')
        return new NextResponse('internal server error',{status:500})
    }
}