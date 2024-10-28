import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { string } from "zod";

interface Iparam {
    params:{id:string}
}

export async function GET(req:Request,{params}:Iparam){
    const {id : code} = params;
    try {
        
        const student = await db.students.findFirst({where:{matric_number:code}});
        if(!student){
            return NextResponse.json({'error':'student does not exist'},{status:405})
        }
        return NextResponse.json({student},{status:200})
    } catch (error) {
        return new NextResponse('internal servr error',{status:500})
        
    }
}