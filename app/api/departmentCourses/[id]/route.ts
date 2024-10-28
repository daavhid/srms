import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Iparam {
    params:{id:string}
}

export async function GET(req:Request,{params}:Iparam){
    const {id : code} = params;
    try {
        
        const departmentCourse = await db.departmentcourses.findFirst({where:{id:Number(code)}});
        if(!departmentCourse){
            return NextResponse.json({'error':'departmentCourse does not exist'},{status:405})
        }
        return NextResponse.json({departmentCourse},{status:200})
    } catch (error) {
        return new NextResponse('internal servr error',{status:500})
        
    }
}