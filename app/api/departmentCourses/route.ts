import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest,){
    const {courseCode,semesterCode,departmentCode,level,credit,staffId} = await req.json()
    try {
        const existingdeptCourse = await db.departmentcourses.findFirst({
            where:{
                AND:[
                    {
                        courseCode:courseCode
                    },
                    {
                        departmentCode:departmentCode
                    }
                ]
            }
        })
        const existingCourse = await db.courses.findFirst({
            where:{courseCode}
        })
        const existingSemester = await db.semesters.findFirst({
            where:{semesterCode}
        })
        const existingDepartment = await db.departments.findFirst({
            where:{departmentCode}
        })
        const existingStaff = await db.staffs.findFirst({
            where:{id:staffId}
        })
        console.log()
        if(existingdeptCourse) {
            return NextResponse.json({error: " course already assigned"},{status:405})
        }
        if(!existingCourse){
            return NextResponse.json({error: "course does not exist"},{status:405})
        }
        if(!existingStaff){
            return NextResponse.json({error:'Staff does not exist '},{status:405})
        }
        if(!existingSemester){
            return NextResponse.json({error:'semester does not exist '},{status:405})
        }
        const newCourse = await db.departmentcourses.create({
            data: {
               credit:credit,
                departments:{
                    connect:{
                        departmentCode:departmentCode,
                    }
                },
                staffs:{
                    connect:{
                        id:staffId
                    }
                },
                courses:{
                    connect:{
                        courseCode:courseCode
                    }
                },
                semesters:{
                    connect:{
                        semesterCode:semesterCode
                    }
                }

            }
        })
        return NextResponse.json({message:'staff assigned '},{status:201})
        
    } catch (error) {
        console.log(error)
        return new NextResponse('internal server error',{status:500})
        
    }
    
   
}



export async function GET(req:Request,){
    const {searchParams} = new URL(req.url)
    const department = searchParams.get("department")
    const level = searchParams.get("level")
    const pageNum = +(searchParams.get('pageNum')??0) 
    const pageSize = +(searchParams.get('pageSize')??10) 
    const staffId :any = searchParams.get("staffId")
    const semesterId :any= searchParams.get("semesterId")

    if(staffId ){
        try{
            const departmentalCourses = await db.departmentcourses.findMany({
                where:{
                    AND: [
                        {
                            staffId:Number(staffId) as number
                        }
                       
                    ]
                },select:{
                    id:true,
                    credit:true,
                    courses:{
                        select:{
                            courseCode:true,
                            title:true
    
                        }
                    },
                    semesters:{
                        select:{
                            id:true
                        }
                    }
                }
            });
            if(!departmentalCourses){
                return NextResponse.json({'error':'departmentalCourses dont exist'},{status:405})
            }
            return NextResponse.json({departmentalCourses},{status:200})
        }catch(err){
            return new NextResponse('internal servr error',{status:500})
        }
    }
    if(!department && !level && !staffId && !semesterId){
        try {
            const departmentalCourses = await db.departmentcourses.findMany({
                skip:pageNum * pageSize,
                take:pageSize
            });
            if(!departmentalCourses){
                return NextResponse.json({'error':'departmentalCourses dont exist'},{status:405})
            }
            return NextResponse.json({departmentalCourses},{status:200})
        } catch (error) {
            return new NextResponse('internal servr error',{status:500})
            
        }
    }
    try {
        const departmentalCourses = await db.departmentcourses.findMany({
            where:{
                AND: [
                    {
                        departmentCode:department as string
                    },
                ]
            },select:{
                id:true,
                credit:true,
                courses:{
                    select:{
                        courseCode:true,
                        title:true

                    }
                },
                semesters:{
                    select:{
                        id:true
                    }
                }
            }
        });
        if(!departmentalCourses){
            return NextResponse.json({'error':'departmentalCourses dont exist'},{status:405})
        }
        return NextResponse.json({departmentalCourses},{status:200})
    } catch (error) {
        return new NextResponse('internal servr error',{status:500})
        
    }

}