import { db } from "@/lib/db";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest,){
    const {startDate,endDate} = await req.json()
    try {
        if(new Date(endDate) < new Date(startDate)){
           return  NextResponse.json({error:'invalid Start and End Date'},{status:405})
        }
        const sessionCode = `${new Date(startDate).getFullYear()}/${new Date(endDate).getFullYear()}`
        const session = await db.session.findUnique({where:{sessionCode}})
        if(session){
            return NextResponse.json({error:'session already exist'},{status:405})
        }
        
        
        const newSemester = await db.session.create({
            data:{
                sessionCode,
                startDate:new Date(startDate),
                endDate:new Date(endDate),
            }
        })
        return NextResponse.json({newSemester},{status:201})
        
    } catch (error) {
        return new NextResponse('internal server error',{status:500})
        
    }
    
   
}

export async function GET(req:Request){
    const {searchParams} = new URL(req.url)
    const code = searchParams.get("code")
    if(!code){
        try {
            const sessions = await db.session.findMany({
                select:{
                    id:true,
                    sessionCode:true,
                    endDate:true,
                    startDate:true
                }
            })
            return NextResponse.json({sessions},{status:200})
        } catch (error) {
            return new NextResponse('internal server error',{status:500})
        }
    }
    try {
        const session =  await db.session.findUnique({
            where:{sessionCode:code},
            select:{
                id:true,
                
                sessionCode:true,
                endDate:true,
                startDate:true
            }
        })
        return NextResponse.json({session},{status:200})
    }catch(err){
        return new NextResponse('internal server error',{status:500})
    }

}