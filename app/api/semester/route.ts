import { db } from "@/lib/db";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { date } from "zod";


export async function POST(req:NextRequest,){
    const {name,startDate,endDate,sessionCode} = await req.json()
    try {
        if(new Date(endDate) < new Date(startDate)){
            return  NextResponse.json({error:'invalid Start and End Date'},{status:405})
         }
        const session = await db.session.findUnique({where:{sessionCode}})
        if(!session){
            return NextResponse.json({error:'session does not exist'})
        }
        const semesterCode = `${name}-${new Date(session.startDate).getFullYear()}/${new Date(session.endDate).getFullYear()}`
        const existingSemester = await db.semesters.findUnique({
            where:{semesterCode}
        })
        if(existingSemester){
            return NextResponse.json({error:'semester already exists'},{status:405})
        }
        const newSemester = await db.semesters.create({
            data:{
                name:name,
                semesterCode:semesterCode,
                sessionCode:session.sessionCode,
                startDate:new Date(startDate),
                endDate:new Date(endDate),
            }
        })
        return NextResponse.json({newSemester},{status:201})
        
    } catch (error) {
        console.log(error)
        return new NextResponse('internal server error',{status:500})
        
    }
    
   
}

export async function GET(req:Request){
    const {searchParams} = new URL(req.url)
    const search = searchParams.get("search")

    if(!search){
        try {
            const semesters = await db.semesters.findMany({})
            return NextResponse.json({semesters},{status:200})
        } catch (error) {
            return new NextResponse('internal server error',{status:500})
        }
        
    }
    try {
        const semester = await db.semesters.findFirst({
            where:{startDate:{gt:new Date(search)}},
            select:{
                id:true,
                semesterCode:true,
                sessionCode:true,
                endDate:true,
                startDate:true
            }
        })
        return NextResponse.json({semester},{status:200})
    } catch (error) {
        return new NextResponse('internal server error',{status:500})
    }
    

}