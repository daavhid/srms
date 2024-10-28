'use server'
import { db } from "@/lib/db"
import { promises } from "fs"

export const registerCourses = async(matric_number:string,semesterCode:string)=>{
    const student = await db.students.findUnique({
        where:{matric_number}
    })

    const departmentCourse = await db.departmentcourses.findMany({
        where:{
            AND:[
                {
                    semesterCode
                    
                },
                {
                    departments:{
                        id:student?.departmentId
                    }
                }
            ]
        },select:{
            id:true,
            courses:true,
            courseCode:true,
            credit:true,
            resultsAvailable:true,
            semesterCode:true
        }
    })
    const departmentCourseMap = departmentCourse.map(async course => {
        const title = await getCourseByCode(course?.courseCode)
        return (
            {
                id:course.id,
                courseCode:course.courseCode,
                title:title?.title,
                credit:course.credit,
                
            }
        )
    })
    const data = await Promise.all(departmentCourseMap)
    if(!data){
        return []
    }
    return data
}
export const getRegisteredCourse = async(matric_number:string,semesterCode:string)=>{
    const registeredCourses = await db.studentCourseReg.findMany({
        where:{
            AND:[
                {
                    matric_number:matric_number
                    
                },
                {
                    semesters:{
                        semesterCode
                    }
                }
            ]
        }
    })
    const registeredCourseMap = registeredCourses.map(async data=>{
        const deptCourse = await db.departmentcourses.findFirst({
            where:{id:data.departmentCourseId as number}
        })
        const title = await getCourseByCode(deptCourse?.courseCode!!)
        return(
            {
                id:deptCourse?.id,
                courseCode:deptCourse?.courseCode,
                title:title?.title,
                credit:deptCourse?.credit,
            }
        )
    })
    const data = await Promise.all(registeredCourseMap).then()
    console.log(data,'this is the map of th register ci8r')
    if(!data){
        return []
    }
    return data
}

const getCourseByCode = async(code:string)=>{
    const course = await db.courses.findFirst({
        where:{courseCode:code}
    })
    if(!course){
        return null
    }
    return course
}



export const fetchResult = async(email:string,semesterId:number)=>{
    const student = await db.students.findUnique({
        where:{email}
    })
    console.log(student,'this is n the school')
    const results = await db.results.findMany({
        where:{
            AND:[
                {
                    isPushed:1

                },
                {
                    studentCourseReg:{
                        matric_number:student?.matric_number,
                        
                    }
                },{
                    studentCourseReg:{
                        semesterId:semesterId
                    }
                }
            ]
        },select:{
            ca:true,
            exam:true,
            gradePoint:true,
            isPassed:true,
            isRetake:true,
            isPushed:true,
            studentCourseReg:{
                select:{
                    departmentCourseId:true,
                }
            }
        }
    })
    console.log(results,'this is in the stydent')

    return results
}

export const fetchSemGpa = async(email:string,semId:number)=>{
    const student = await db.students.findUnique({
        where:{email}
    })
    const gpa = await db.gpas.findFirst({
        where:{
            AND:[
                {

                    semesterId:semId,
                },
                {
                    matric_number:student?.matric_number
                }
            ]
        }
    })
    return gpa
}

export const fetchCgpa = async(email:string)=>{
    const student = await db.students.findUnique({
        where:{email}
    })
    const cgpa = await db.gpas.groupBy({
        by:['matric_number'],
        _sum:{
            totalUnit:true,
            totalGradePoint:true
        },
    })
    for(let data of cgpa){
        if(student?.matric_number===data.matric_number){
            return {
                matric_number:data.matric_number,
                totalUnit:data._sum.totalUnit,
                totalGradePoint:data._sum.totalGradePoint,
            }

        }
        
    }
}

export const getCourse = async(id:number)=>{
    const course = await db.departmentcourses.findUnique({
        where:{
            id:id
        },
        select:{
            courseCode:true,
            credit:true,
            courses:{
                select:{
                    title:true
                }
            }
        }
    })
    return course

}

export const getStudent = async(email:string)=>{
    const student = await db.students.findFirst({
        where:{email},
        select:{
            id:true,
            email:true,
            departments:true,
            matric_number:true,
            firstName:true,
            lastName:true
        }
    })
    return student
}

export const checkCourseRegisterStatus = async(matric_number:string,semesterId:string)=>{
    console.log(semesterId,'in server avtion')
    const course = await db.studentCourseReg.findFirst({
        where:{
            AND:[
                {
                    matric_number
                },
                {
                    semesters:{
                        semesterCode:semesterId
                    }
                }
            ]
        }
    })
    if(course){
        console.log('course in the student server action',course)
        return true
    }
    return false
}

export const getUnclearedCourses = async(email:string)=>{
    const student = await getStudent(email)
    const unClearedCourses = await db.studentCourseReg.findMany({
        where:{
            AND:[
                {
                    results:{
                        isPassed:0
                    }
                },
                {
                    matric_number:student?.matric_number
                }
            ]
        },
        orderBy:{
            departmentCourseId:'asc'
        }
    })
    return unClearedCourses
}