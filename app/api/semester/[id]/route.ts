import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { string } from "zod";

interface Iparam {
    params:{id:string}
}

export async function GET(req:Request,{params}:Iparam){
    const {id : code} = params;
    try {
        
        const semester = await db.semesters.findFirst({where:{semesterCode:code}});
        if(!semester){
            return NextResponse.json({'error':'semester does not exist'},{status:405})
        }
        return NextResponse.json({semester},{status:200})
    } catch (error) {
        return new NextResponse('internal servr error',{status:500})
        
    }
}