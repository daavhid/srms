'use client'
import React, { useEffect, useRef, useState } from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { fetchCgpa, fetchResult, fetchSemGpa, getCourse, getStudent, getUnclearedCourses } from '@/actions/student'
import { cn } from '@/lib/utils'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    
  } from "@/components/ui/select"
import { getCurrentSemester, getSemester } from '@/actions/general'
import { mapResult } from '@/lib/resultMap'
import { Button } from '../ui/button'
import { useReactToPrint } from 'react-to-print'
import Image from 'next/image'

const StudentResult = ({matric_number,user}:{matric_number?:string,user:any}) => {
    const printRef = useRef(null)
    const [results,setResults] = useState<any[]>([])
    const [semesterId,setSemesterId] = useState(0)
    const [student,setStudent] = useState<any>(null)
    const [gpa,setGpa] = useState<any>(null)
    const [cgpa,setCgpa] = useState<any>(null)
    const [semester,setSemester] = useState<any[]>([])
    const [semName,setSemName] = useState('')
    const [sessionCode,setSessionCode] = useState('')
    const [failedCourse,setFailedCourse] = useState<any[]>([])
    useEffect(()=>{
        const fetch = async()=>{
            const semesters = await getSemester()
            if(semesters){
                setSemester(semesters)
            }
            if(semesterId){

                const sem =await  getCurrentSemester(semesterId)
                setSemName(sem?.name!!)
                setSessionCode(sem?.sessionCode!!)
            }
            if(user){
                const studentData = await getStudent(user.email)
                setStudent(studentData)
                setResults([])
                if(semesterId){

                        const resultData = await fetchResult(user?.email,semesterId)
                        const gpaData = await fetchSemGpa(user?.email,semesterId)
                        setGpa(gpaData)
                        const cgpaData = await fetchCgpa(user?.email)
                        setCgpa(cgpaData)
                        setFailedCourse([])
                        const unClearedCourses = await getUnclearedCourses(user?.email)
                        setFailedCourse(prev=>unClearedCourses?.map(course=>([...prev,course.departmentCourseId])))
                        if(resultData){
                            console.log(resultData,user?.email ,'thi iss the result daa')
                            for(let i of resultData){
                                // setFailedCourse([])
                                const course = await getCourse(i.studentCourseReg?.departmentCourseId!!)
                                // if(i.isPassed===0){
                                //     setFailedCourse(prev=>[...prev,course?.courseCode])
                                // }
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
                            setResults(prev=>[...prev,result])
                            results.pop()
                        }
                    }
                }
            
        }
    }
    fetch()
    
},[user,semesterId])
const handlePrint = useReactToPrint({
    contentRef:printRef
})
console.log(results,semester,'this is the results')
  return (
    <div className='flex flex-col gap-6'>
        <Select onValueChange={(e)=>{
            setSemesterId(eval(e))
        }} >
                        
            <SelectTrigger className='w-48 border border-tone6'>
                <SelectValue onClick={(e)=>{console.log(e)}} placeholder="select semester" />
            </SelectTrigger>
            
            <SelectContent onCloseAutoFocus={(e)=>e.preventDefault()}>
                {semester&&semester?.map(sem => (
                    <div key={sem.id}>
                        <SelectItem   value={sem?.id}>{sem?.semesterCode?.replace('-',' ')}</SelectItem>
                    </div>
                ))}
                
            </SelectContent>
        </Select>
        {
            results.length>1?
            <div ref={printRef} className='relative bg-gray-100 print:overflow-hidden print:h-screen'>
                <div className='absolute print:block hidden top-52 left-1/2 -translate-x-[50%] opacity-10  '>
                    <Image src={'/lautech.png'} width={400} height={400} alt='logo'/>
                </div>
                <div className='print:px-8 print:block hidden'>
                    <Image src={'/lautech.png'} width={80} height={80} alt='logo'/>
                </div>
                <div className='w-5/6 uppercase mx-auto print:flex hidden relative z-20  justify-between my-8'>
                        <div>

                            <p className='mb-2'>name :{student?.firstName}{' '} {student?.lastName}</p>
                            <p>matric number : {student?.matric_number}</p>
                        </div>
                        <div>
                            <p className='mb-2'> {semName} semester</p>
                            <p>{sessionCode} session</p>
                        </div>
                    </div>
                    <h1 className='text-center text-xl underline my-3 print:mt-16 print:block hidden'>Student Result</h1>
                <Table className=' mx-auto relative z-20 '>
                    <TableHeader >
                        <TableRow className='text-center'>
                            <TableHead className="w-[90px] font-medium uppercase text-center text-xs">S/N</TableHead>
                            <TableHead className=" uppercase text-xs">Course Code</TableHead>
                            <TableHead className='  text-sm'>Course Title</TableHead>
                            <TableHead className='w-[90px] uppercase text-center  text-sm'>Unit</TableHead>
                            <TableHead className='w-[90px] uppercase  text-sm'>score</TableHead>
                            <TableHead className='w-[90px] uppercase  text-sm'>grade</TableHead>
                            <TableHead className='w-[90px] uppercase  text-sm'>gradePoint</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {results?.map((data:any, index:number) => (
                            <TableRow className={cn(index%2===1&&'bg-sky-50 ')} key={index}>

                                <TableCell className='text-center'>{index+1}</TableCell>
                                <TableCell className=''>{data?.courseCode?.replace('-',' ')}</TableCell>
                                <TableCell className=''>{data?.courseTitle}</TableCell>
                                <TableCell className='text-center'>{data?.unit}</TableCell>
                                <TableCell className='text-center'>{data?.exam + data?.ca}</TableCell>
                                <TableCell className='text-center'>{mapResult(data?.exam +data?.ca)}</TableCell>
                                <TableCell className='text-center'>{data?.gradePoint}</TableCell>
                                {/* <TableCell className='capitalize'>{data?.exam}</TableCell> */}
                            
                            </TableRow>
                        ))}
                        {/* <TableRow>
                            <TableCell className="font-medium">INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                        </TableRow> */}
                    </TableBody>
                </Table>
                    <Table>
                        <TableHeader >
                            <TableRow>
                                <TableHead className=" font-medium uppercase text-xs"></TableHead>
                                <TableHead className=" uppercase text-xs"></TableHead>
                                <TableHead className=" uppercase text-xs"></TableHead>
                                <TableHead className=" uppercase text-xs"></TableHead>
                                <TableHead className=" uppercase text-xs"></TableHead>
                                <TableHead className=" uppercase text-xs"></TableHead>
                                
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={3} className='text-center uppercase'>{semName} Semester</TableCell>
                                <TableCell colSpan={3} className='text-center uppercase'>Cumulative Semester</TableCell>
                            </TableRow>
                            <TableRow className='text-center'>
                                <TableCell>point</TableCell>
                                <TableCell>Unit</TableCell>
                                <TableCell>GPA</TableCell>
                                <TableCell>total Point</TableCell>
                                <TableCell>Total Unit</TableCell>
                                <TableCell>CGPA</TableCell>
                            </TableRow>
                            <TableRow className='text-center'>
                                <TableCell>{gpa?.totalGradePoint}</TableCell>
                                <TableCell>{gpa?.totalUnit}</TableCell>
                                <TableCell>{results.length>1&&(gpa?.totalGradePoint/gpa?.totalUnit).toPrecision(3)}</TableCell>
                                <TableCell>{results.length>1&&cgpa?.totalGradePoint}</TableCell>
                                <TableCell>{results.length>1&&cgpa?.totalUnit}</TableCell>
                                <TableCell>{results.length>1&&(cgpa?.totalGradePoint/cgpa?.totalUnit).toPrecision(3)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>uncleared Courses</TableCell>
                            </TableRow>
                            <TableRow>
                                {failedCourse?.map((course,index)=>(
                                    <TableCell key={index}>{course}</TableCell>
                                ))}
                                {/* <TableCell>{results.}</TableCell> */}
                            </TableRow>
                        </TableBody>
                    </Table>
            </div>:<p className='text-center'>No result to show </p>
        }
        {results.length>1&&<Button type='submit' onClick={()=>handlePrint()} variant={'auth'} className='   rounded-md hover:bg-purple-600/85   bg-purple-600 z-40 text-white left-2' >Print</Button>}
    </div>
  )
}

export default StudentResult