import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { string } from "zod";

interface Iparam {
    params:{id:string}
}

export async function GET(req:Request,{params}:Iparam){
    const {id : code} = params;
    try {
        
        const faculty = await db.faculties.findFirst({where:{code:code}});
        if(!faculty){
            return NextResponse.json({'error':'faculty does not exist'},{status:405})
        }
        return NextResponse.json({faculty},{status:200})
    } catch (error) {
        return new NextResponse('internal servr error',{status:500})
        
    }
}