import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { string } from "zod";

interface Iparam {
    params:{id:string}
}

export async function GET(req:Request,{params}:Iparam){
    const {id : code} = params;
    try {
        
        const course = await db.courses.findFirst({where:{courseCode:code}});
        if(!course){
            return NextResponse.json({'error':'course does not exist'},{status:405})
        }
        return NextResponse.json({course},{status:200})
    } catch (error) {
        return new NextResponse('internal servr error',{status:500})
        
    }
}