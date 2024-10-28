import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest,){
    const {title,code,department} = await req.json()
    const courseCode = `${department}-${code}`
    try {
        const existingCourse = await db.courses.findUnique({
            where:{courseCode}
        })
        if(existingCourse){
            return NextResponse.json({error: "course already exists"},{status:405})
    
        }
        const newCourse = await db.courses.create({
            data:{
                title,
                courseCode
            }
        })
        return NextResponse.json({message:'course successfully created'},{status:201})
        
    } catch (error) {
        return new NextResponse('internal server error',{status:500})
        
    }
    
   
}

export async function GET(req:Request,){
    const {searchParams} = new URL(req.url)
    const search = searchParams.get("search")
    

    if(!search){

        try {
            const courses = await db.courses.findMany({
                select:{
                    title:true,
                    courseCode:true
                }
            });
            if(!courses){
                return NextResponse.json({'error':'courses dont exist'},{status:405})
            }
            return NextResponse.json({courses},{status:200})
        } catch (error) {
            return new NextResponse('internal servr error',{status:500})
            
        }
    }
    try {
        const courses = await db.courses.findMany({
            where:{courseCode:{contains:search as string}},
            select:{
                title:true,
                courseCode:true
            }
        });
        if(!courses){
            return NextResponse.json({'error':'courses dont exist'},{status:405})
        }
        return NextResponse.json({courses},{status:200})
    } catch (error) {
        return new NextResponse('internal servr error',{status:500})
        
    }
}