import { db } from "@/lib/db";
import { mapResult, scoreWeight } from "@/lib/resultMap";
import { NextRequest, NextResponse } from "next/server";





export async function POST(req:NextRequest){
    const {ca,exam,courseRegId,courseId} = await req.json()
    const totalScore = ca + exam
    const grade = mapResult(totalScore)


    // const pointGrade = 
    try {
        const existingCourse = await db.departmentcourses.findFirst({
           where:{
                id:courseId
           }
        })
        const courseReg = await db.studentCourseReg.findFirst({
            where:{
                id:courseRegId
            }
        })
        const exsitingstudentResult = await db.results.findMany({
            where:{
                AND:[
                    {
                        studentCourseReg:{
                            matric_number:courseReg?.matric_number
                        }

                    },
                    {
                        studentCourseReg:{
                            departmentCourseId:courseReg?.departmentCourseId
                        }

                    }
                ]
            }
        })
        const courseUnit = existingCourse?.credit as number
        console.log(courseUnit,'this the course')
        const gradePoint = scoreWeight[grade] * courseUnit
        let isPassed = grade==='F'?0:1
        let isRetake = grade==='F'?1:0
        if(exsitingstudentResult.length>=1){

            const newResult = await db.results.create({
                data:{
                    ca: ca,
                    exam:exam,
                    courseRegId: courseRegId,
                    gradePoint:gradePoint,
                    isPassed:isPassed,
                    isRetake:1,
                }
            })
            return NextResponse.json({message:'result added'},{status:201})
        }else{
        const newResult = await db.results.create({
            data:{
                ca: ca,
                exam:exam,
                courseRegId: courseRegId,
                gradePoint:gradePoint,
                isPassed:isPassed,
                isRetake:isRetake,
            }
        })
        return NextResponse.json({message:'result added'},{status:201})
    }
    } catch (error) {
        console.log(error)
        return new NextResponse('internal server error',{status:500})
    }

}

export async function GET(req:NextRequest){
    try {
        const results = await db.results.findMany({})
        return NextResponse.json({results},{status:200})
        
    } catch (error) {
        return new NextResponse('internal server error',{status:500})
    }
}