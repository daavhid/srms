import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { string } from "zod";

interface Iparam {
    params:{id:string}
}

export async function GET(req:Request,{params}:Iparam){
    const {id } = params;
    try {
        
        const staff = await db.staffs.findFirst({where:{id:Number(id)}});
        if(!staff){
            return NextResponse.json({'error':'staff does not exist'},{status:405})
        }
        return NextResponse.json({staff},{status:200})
    } catch (error) {
        return new NextResponse('internal servr error',{status:500})
        
    }
}