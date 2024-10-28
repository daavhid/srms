import { studentDomain } from "@/constants";
import { db } from "@/lib/db";
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest,){
    
    const {firstName,lastName,email,matric_number,departmentCode,level,password}= await req.json()
    const hashPassword = await bcryptjs.hash(password,10) 
    if(!email.endsWith(studentDomain)){
       return NextResponse.json({error:'email is not recognised'},{status:405})
    }
    try {
        const existingDepartment = await db.departments.findUnique({
            where:{departmentCode:departmentCode}
        })
        if(!existingDepartment){
            return NextResponse.json({error:'department does not exist'},{status:405})
        }
        const existingStudentEmail = await db.students.findUnique({
            where: {email}
        })
        const existingStudentMatric = await db.students.findUnique({
            where: {matric_number}
        })
        if(existingStudentEmail || existingStudentMatric){
            return NextResponse.json({error:'student already exists'},{status:405})
        }


        const newStudent = await db.students.create({
            data:{
                firstName,
                lastName,
                departmentId:existingDepartment.id,
                email,
                level,
                password:hashPassword,
                matric_number
            }
        })
        await db.users.create({
            data:{
                username:firstName,
                email:email,
                password:hashPassword,
                role:'STUDENT'
            }
        })
        return NextResponse.json({message:"student added"},{status:201})
        
    } catch (error) {
        console.log(error)
        return new NextResponse('internal server error',{status:500})
        
    }
    
   
}

export async function GET(req:Request){
    const {searchParams} = new URL(req.url)
    const email = searchParams.get("email")
    try {
        if(!email){

            const students = await db.students.findMany({})
            return NextResponse.json({students},{status:200})
        }
        const student = await db.students.findFirst({
            where:{email},
            select:{
                level:true,
                departments:true,
                matric_number:true
                
            }
        })
        return NextResponse.json({student},{status:200})
    } catch (error) {
        return new NextResponse('internal server error',{status:500})
    }


}