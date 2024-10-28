import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    const {matric_number,semesterId,departmentCourses} = await req.json()
    console.log(departmentCourses)
    try {
        for(let id of departmentCourses){


            const existingStudentCourseReg = await db.studentCourseReg.findMany({
                where:{AND:[
                    {
                        matric_number,
                        departmentCourseId:id
                    },
                    {
                        departmentCourseId:id
                    }
                ]}
            }) 
            
            // const list = existingStudentCourseReg.some(async(existingCourseReg)=>{
            //     const existingCourseResult = await db.results.findUnique({
            //         where:{courseRegId:existingCourseReg?.id}
            //     })
            //     console.log(existingCourseResult,'in the some block')
            //     if(existingCourseResult?.isRetake===1 && existingCourseResult.isPassed===1){
            //         return false
            //     }

            // })
            // console.log(list,'this is the list i te ')
            if(existingStudentCourseReg){

                let passed = false
                for(let existingCourseReg of existingStudentCourseReg){
                    console.log(existingCourseReg,'this is the reg')
                    if(existingCourseReg){
                        console.log('course exists')
                        const existingCourseResult = await db.results.findUnique({
                            where:{courseRegId:existingCourseReg?.id}
                        })
                        if(existingCourseResult){
                            if(existingCourseResult.isPassed ){
                                passed = true
                            }else{passed = false}
                                // const newStudentCourseReg = await db.studentCourseReg.create({
                                //     data:{
                                //         matric_number,
                                //         semesterId,
                                //         departmentCourseId:id
                                //     }
                                // })
                                // return NextResponse.json({message:'course registered suessfully'},{status:201})
                        }
                    }
                }
                if(passed){
                    return NextResponse.json({error:"student course already registered"},{status:403})
                }else{
                    if(semesterId === existingStudentCourseReg[existingStudentCourseReg.length-1]?.semesterId){
                            return NextResponse.json({error:'cannot register for the same course in a single semester'},{status:403})
                        }
                    await db.studentCourseReg.create({
                            data:{
                                matric_number,
                                semesterId,
                                departmentCourseId:id
                            }
                        })
                        // return NextResponse.json({message:'course registered suessfully'},{status:201})
    
                }
            }else{
                await db.studentCourseReg.create({
                    data:{
                        matric_number,
                        semesterId,
                        departmentCourseId:id
                    }
                })
            }
              
               
            }
            return NextResponse.json({message:'course registered suessfully'},{status:201})
        }
        
        
     catch (error) {
        console.log(error)
        return new NextResponse('internal server error',{status:500})
        
    }
    
   
}

export async function GET(req:NextRequest){
    const {searchParams} = new URL(req.url)
    const matric_number = searchParams.get("matric_number")
    const semesterId = searchParams.get('semesterId')
    const course = searchParams.get('course')
    if(matric_number){
        try {
            const studentCourseReg = await db.studentCourseReg.findFirst({
                where:{
                    AND:[
                        {
                            matric_number
                        },
                        {
                            semesterId:Number(semesterId)
                        }
                    ]
                }
            })
            return NextResponse.json({studentCourseReg},{status:200})
        } catch (error) {
            return new NextResponse('internal server error',{status:500})
        }
    }
    if(course){
        const existingdeptCourse = await db.departmentcourses.findFirst({
            where:{
               courseCode:course
            }
        })
        try {
            const students = await db.studentCourseReg.findMany({
                where:{
                    departmentCourseId:existingdeptCourse?.id
                }
            })
            return NextResponse.json({students},{status:200})
        } catch (error) {
            return new NextResponse('internal server error',{status:500})
        }

    }
    try {
        const studentsCourseReg = await db.studentCourseReg.findMany({})
        return NextResponse.json({studentsCourseReg},{status:200})
    } catch (error) {
        return new NextResponse('internal server error',{status:500})
    }

}