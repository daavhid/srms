import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Iparam {
    params:{id:string}
}

export async function GET(req:Request,{params}:Iparam){
    const {id : code} = params;
    try {
        
        const studentCourseReg = await db.studentCourseReg.findFirst({where:{id:Number(code)}});
        if(!studentCourseReg){
            return NextResponse.json({'error':'student course not registered'},{status:405})
        }
        return NextResponse.json({studentCourseReg},{status:200})
    } catch (error) {
        return new NextResponse('internal server error',{status:500})
        
    }
}