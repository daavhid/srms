import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { string } from "zod";

interface Iparam {
    params:{id:string}
}

export async function GET(req:Request,{params}:Iparam){
    const {id : code} = params;
    
    try {
        
        const session = await db.session.findFirst({where:{sessionCode:code}});
        if(!session){
            return NextResponse.json({'error':'session does not exist'},{status:405})
        }
        return NextResponse.json({session},{status:200})
    } catch (error) {
        return new NextResponse('internal server error',{status:500})
        
    }
}