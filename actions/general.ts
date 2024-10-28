'use server'

import { db } from "@/lib/db";



export const getSessions = async()=>{
    const session = await db.session.findMany({
    });
    if(!session){
        return null
    }
    return session
}
export const getSession = async(sessionCode:string)=>{
    const session =  await db.session.findUnique({
        where:{sessionCode},
        select:{
            id:true,
            
            sessionCode:true,
            endDate:true,
            startDate:true
        }
    })
    if(!session){
        return null
    }
    return session
}
export const getSemester = async()=>{

    const semester = await db.semesters.findMany({});
    if(!semester){
        return null
    }
    return semester
}
export const getCurrentSemester = async(semesterCode:number)=>{

    const semester = await db.semesters.findFirst({
        where:{
            id:semesterCode
        }
    });
    if(!semester){
        return null
    }
    return semester
}

export const staffDepartmentCourses =async(staffId:number,semesterCode:string)=>{
    const departmentalCourses = await db.departmentcourses.findMany({
        where:{
            AND: [
                {
                    staffId:Number(staffId) as number
                },
                {
                    semesterCode:semesterCode
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
        return []
    }
    return departmentalCourses

}

export const getStaff = async(email:string)=>{
    const staff = await db.staffs.findFirst({
        where:{email},
        select:{
            id:true,
            email:true,
            departments:true
        }
    })
    return staff
}

export const getSem = async(semesterCode:string)=>{
    const tableData = await db.semesters.findFirst({
        where:{
            semesterCode
        }
    })
    if(!tableData){
        return null
    }

    return tableData
}

export const getCourses = async(deptCode:string)=>{
    const courses = await db.courses.findMany({
        where:{
            courseCode:{contains:deptCode}
        }
    })
    return courses
}

export const getDepartmentStaffs = async(deptCode:string)=>{
    const staffs = await db.staffs.findMany({
        where:{
            departments:{
                departmentCode:deptCode
            }
        }
    })
    return staffs
}

export const getStaffs = async()=>{
    const staffs = await db.staffs.findMany({
        include:{
            departments:true
        }
    })
    return staffs
}
export const getAllCourses = async()=>{
    const courses = await db.courses.findMany({
    })
    return courses
}
export const getStudents = async()=>{
    const students = await db.students.findMany({
        include:{
            departments:true
        }
    })
    return students
}
export const getAssignedStaffs = async(semesterCode:string)=>{
    const courses = await db.departmentcourses.findMany({
        where:{
            semesterCode
        },
        include:{
            staffs:{
                select:{
                    title:true,
                    firstName:true,
                    lastName:true,
                    email:true
                }
            },
            courses:{
                select:{
                    courseCode:true,
                    title:true
                }
            }
        }
    })
    return courses
}


