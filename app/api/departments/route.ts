import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest,){
    const {name,code,facultyCode} = await req.json()
    try {
        const existingFaculty = await db.faculties.findUnique({
            where:{code:facultyCode}
        })
        if(!existingFaculty){
            return NextResponse.json({error:'faculty does not exist'},{status:403})
        }
        const existingDepartment = await db.departments.findUnique({
            where: {departmentCode:code}
        })
        if(existingDepartment){
            return NextResponse.json({error:'department already exists'},{status:403})
        }


        const newDepartment = await db.departments.create({
            data:{
                name:name,
                departmentCode:code,
                facultyCode:facultyCode,
            }
        })
        return NextResponse.json({message:'Department Added'},{status:201})
        
    } catch (error) {
        return new NextResponse('internal server error',{status:500})
        
    }
    
   
}

export async function GET(req:Request){
    const {searchParams} = new URL(req.url)
    const search = searchParams.get("search")
    if(!search){
        try {
            const departments = await db.departments.findMany({
    
                select:{
                    name:true,
                    departmentCode:true,
                    facultyCode:true,
                    staffs:true
                }
            })
        
            return NextResponse.json({departments},{status:200})
        } catch (error) {
            return new NextResponse('internal server error',{status:500})
        }
    }
    try {
        const departments = await db.departments.findFirst({
            where:{
                departmentCode:search
            },

            select:{
                name:true,
                departmentCode:true,
                facultyCode:true,
                staffs:true
            }
        })
        return NextResponse.json({departments},{status:200})
    } catch (error) {
        return new NextResponse('internal server error',{status:500})
    }
}