import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Iparam {
    params:{id:string}
}

export async function GET(req:Request,{params}:Iparam){
    const {id : code} = params;
    try {
        
        const department = await db.departments.findFirst({where:{departmentCode:code}});
        if(!department){
            return NextResponse.json({'error':'department does not exist'},{status:405})
        }
        return NextResponse.json({department},{status:200})
    } catch (error) {
        return new NextResponse('internal servr error',{status:500})
        
    }
}