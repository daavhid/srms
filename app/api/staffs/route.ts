import { StaffDomain } from "@/constants";
import { db } from "@/lib/db";
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server";

const name  = 'david'

export async function POST(req:NextRequest,){
    const {firstName,lastName,role,email,password,departmentCode,title} = await req.json()

    const hashPassword = await bcryptjs.hash(password,10) 
    try {
        if(!email.endsWith(StaffDomain)){
            return NextResponse.json({error:'not a valid school email'},{status:405})
         }
        const existingDepartment = await db.departments.findUnique({
            where:{departmentCode:departmentCode}
        })
        if(!existingDepartment){
            return NextResponse.json({error:'department does not exist'},{status:405})
        }
        const existingStaff = await db.staffs.findUnique({
            where: {email}
        })
        if(existingStaff){
            return NextResponse.json({error:'staff already exists'},{status:404})
        }


        const newStaff = await db.staffs.create({
            data:{
                firstName,
                title,
                lastName,
                departmentId:existingDepartment.id,
                email,
                password:hashPassword,
                role
            }
        })
        await db.users.create({
            data:{
                username:firstName,
                email:email,
                password:hashPassword,
                role:'STAFF'
            }
        })
        return NextResponse.json({message:'Staff added'},{status:201})
        
    } catch (error) {
        return new NextResponse('internal server error',{status:500})
        
    }
    
   
}

export async function GET(req:Request){
    const {searchParams} = new URL(req.url)
    const email = searchParams.get("email")
    try {
        if(!email){

            const staffs = await db.staffs.findMany({})
            return NextResponse.json({staffs},{status:200})
        }
        const staff = await db.staffs.findFirst({
            where:{email},
            select:{
                id:true,
                email:true,
                departments:true
            }
        })
        return NextResponse.json({staff},{status:200})
    } catch (error) {
        return new NextResponse('internal server error',{status:500})
    }

}