import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest,){
    const {name,code} = await req.json()
    try {
        const existingFaculty = await db.faculties.findUnique({
            where:{code}
        })
        if(existingFaculty){
            return NextResponse.json({error:'faculty already exists'},{status:405})
        }
        const newFaculty = await db.faculties.create({
            data:{
                name:name,
                code:code,
            }
        })
        return NextResponse.json({newFaculty},{status:201})
        
    } catch (error) {
        return new NextResponse('internal server error',{status:500})
        
    }
    
   
}

export async function GET(){
    try {
        const faculties = await db.faculties.findMany({
            select:{
                code:true,
                name:true

            }
        })
        return NextResponse.json({faculties},{status:200})
    } catch (error) {
        return new NextResponse('internal server error',{status:500})
    }

}