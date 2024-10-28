'use server'

import { db } from "@/lib/db"
import { resultSchema } from "@/schemas"
import * as z from 'zod'
import { getCurrentSemester, getSem, getSemester } from "./general"
import { fetchCgpa, fetchSemGpa, getCourse,fetchResult } from "./student"
import { sendResultsToParents } from "@/lib/mail"

interface Iresult{
    courseCode:string,
    semesterCode:string
}

export const result = async(courseCode:string,semesterCode:string)=>{
    console.log(courseCode,'in the server')
    const courses = await db.departmentcourses.findFirst({
        where:{
            courseCode:courseCode
        }
    })
    await db.results.updateMany({
        where:{
            AND:[
                {

                    studentCourseReg:{
                        departmentCourseId:courses?.id,
                    }
                },
                {
                    studentCourseReg:{
                        semesters:{
                            semesterCode:semesterCode
                        }
                    }
                }
            ]
            },data:{
            pending:0
        }
    })
    await db.departmentcourses.update({
        where:{
            id:courses?.id,
            
        },data:{
            resultsAvailable:1
        }
    })
    return {message:'Sent successfully'}

}

export const fetchResultStatus = async(semId:number)=>{
    const departmentCourses = await db.departmentcourses.findMany({
        where:{
            semesters:{
                id:semId
            }
        },include:{
            courses:true
        }
    });
    return {data:departmentCourses}
    
}

export const fetchCourseResult = async(courseCode:string,semId:number|undefined)=>{
    const courses = await db.departmentcourses.findFirst({
        where:{
            AND:[
                {
                    courseCode:courseCode

                },
                
            ]
        }
    })
    const data = await db.results.findMany({
        where:{
            AND:[
                {

                    studentCourseReg:{
                        departmentCourseId:courses?.id
                    },
                },
                {
                    studentCourseReg:{
                        semesterId:semId
                        
                    }
                }
            ]
        
            },select:{
                id:true,
                courseRegId:true,
                exam:true,
                ca:true,
                studentCourseReg:{
                    select:{
                        matric_number:true
                    }
                }
        }
    })
    if(!data){
        return []
    }
    return data
}

export const sendResultToStudents = async(semesterId:number)=>{
    const results = await db.results.findFirst({
        where:{
            AND:[
                {

                    isPushed:0
                },
                {
                    studentCourseReg:{
                        semesterId
                    }
                }
            ]
        }
    })
    if(results){
        await db.results.updateMany({
            where:{
                studentCourseReg:{
                    semesterId
                }
            },
            data:{
                isPushed:1,
                pending:0
            }
        })
        return {message:'successfully sent to students'}
    }
    return {error:'Already sent to students'}
    
}

export const semesterGpa = async(semesterCode:string)=>{
    console.log('this is where it is now ')
    const students = await db.students.findMany({
        include:{
            studentCourseReg:{
                include:{
                    results:true
                }
            },

        }
    })
    let totalCredit = 0
    const data = await db.departmentcourses.groupBy({
        by:['semesterCode'],
        _sum:{
            credit:true
        }
    })
    for (let i of data){
        if(i.semesterCode===semesterCode){
            totalCredit = i._sum.credit!!
        }
    }
    const sem = await getSem(semesterCode)

    for(let student of students){
        let totalGradePoint = 0
        for (let result of student.studentCourseReg){
            if(result.semesterId===sem.id){
                // totalCredit = i._sum.credit!!
                totalGradePoint+= result.results?.gradePoint!!
            }
        }
        const existStudentGpa = await db.gpas.findFirst({
            where:{
                AND:[
                    {
                        matric_number:student?.matric_number
                    },{
                        semesterId:sem.id
                    }
                ]
            }
        })
        if(existStudentGpa){
            console.log('this is true for the student')
            continue
        }   
        const GPA = await db.gpas.create({
            data:{
                matric_number:student.matric_number,
                totalUnit:totalCredit,
                totalGradePoint:totalGradePoint,
                semesterId:sem?.id,
            }
        })
        console.log("this is the gpa", GPA)
    }

}

export const sendResultstoParent = async(semesterId:number)=>{
    console.log('we are here now in the parents sed resut')
    const students = await db.students.findMany({
        include:{
            studentCourseReg:{
                include:{
                    results:true
                }
            },

        }
    })
    const sem = await getCurrentSemester(semesterId)
    for (let student of students){
        const gpa = await fetchSemGpa(student?.email,semesterId)
        const resultData = await fetchResult(student?.email,semesterId)
        let results = []
        let failedCourses = []
        for(let i of resultData){
            // setFailedCourse([])
            const course = await getCourse(i.studentCourseReg?.departmentCourseId!!)
            const result = {
                ca:i.ca,
                exam:i.exam,
                gradePoint:i.gradePoint,
                isPassed:i.isPassed,
                isRetake:i.isRetake,
                ispushed:i.isPushed,
                courseCode:course?.courseCode!!,
                courseTitle:course?.courses?.title!!,
                unit:course?.credit!!
        
            }
            if(result.isPassed===0){
                failedCourses.push(result.courseCode)

            }
            results.push(result)
        
        }
        const cgpas = await fetchCgpa(student?.email)
        await sendResultsToParents(student,results,failedCourses,gpa,cgpas,sem,'victortoyosi@gmail.com')
        console.log('the results has been sent to the parents sucessfully')
    }
}
 