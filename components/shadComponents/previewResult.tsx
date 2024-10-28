'use client'
import React, { useEffect, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    
  } from "@/components/ui/select"
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
import axios from 'axios'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { cn } from '@/lib/utils'
import { fetchResultStatus, semesterGpa, sendResultstoParent, sendResultToStudents } from '@/actions/sendResult'
import { Button } from '../ui/button'
import ViewResult from '../staffs/viewResults'
import { toast } from 'react-toastify'
import { getCurrentSemester, getSemester  } from '@/actions/general'
import { sendResultsToParents } from '@/lib/mail'
const PreviewResultTable = () => {
    const [results,setResults] = useState<any[]>([])
    const [course,setCourse] = useState('')
    const [availableResult,setAvailableResult] = useState(0)
    const [pendingResult,setPendingResult] = useState(0)
    const [semester,setSemester] = useState<any[]>([])
    const [semId,setSemId] = useState(0)

    useEffect(() => {
        const fetch = async()=>{

            const semesters = await getSemester()
            if(semesters){
                setSemester(semesters)
            }
            const coursesdata = await fetchResultStatus(semId)
            
            setResults(coursesdata?.data)
            setAvailableResult(0)
            setPendingResult(0)
            for(let i of coursesdata?.data) {
                console.log(i,'in the effe')
                if(i.resultsAvailable){
                    setAvailableResult(prev=>prev+1)

                }else{
                    setPendingResult(prev=>prev+1)
                }

            }
        }
        fetch()
    },[semId])

    const sendResult = async()=>{
        try {
            const sem = await getCurrentSemester(semId)
            // await semesterGpa(sem?.semesterCode!!)
            // const semester = await getCurrentSemester()
            console.log(semester,'this is the sem')
            const resultData = await sendResultToStudents(semId)
            
            console.log(resultData,'this is from the client')
            await semesterGpa(sem?.semesterCode!!)
            await sendResultstoParent(semId)
            if(resultData.message){
                toast.success(`${resultData?.message}`)
            }else{

                toast.error(`${resultData?.error}`)
            }
            
        } catch (error) {
            console.log(error)
        }
        
    }
  return (
    <div className='grid grid-cols-2  space-x-6'>
        <div className='w-full '>
            <div className=' bg-white flex justify-between gap-2 text-black  mx-8 p-4 mb-4 rounded-xl shadow-xl'>
                <div>

                    <p className='font-medium text-tone4'>Total Courses : {results.length}</p>
                    <p className='font-medium text-tone4'>Available Results : {availableResult} </p>
                    <p className='font-medium text-tone4'>Pending Resullts : {pendingResult}</p>
                    {results.every(result=>{
                        if(result.resultsAvailable){
                            return true
                        }
                    })&&<Button className='my-1' onClick={()=>{sendResult()}}>push to students</Button>}
                </div>
                <Select onValueChange={(e)=>{
                    setSemId(eval(e))
                }} >
                                
                    <SelectTrigger className='w-[13rem]'>
                        <SelectValue onClick={(e)=>{console.log(e)}} placeholder="select semester" />
                    </SelectTrigger>
                    
                    <SelectContent >
                        {semester?.map(sem => (
                            <div >
                                <SelectItem   value={sem.id}>{sem.semesterCode.replace('-',' ')}</SelectItem>
                            </div>
                        ))}
                        
                    </SelectContent>
                </Select>

            </div>
            <ScrollArea className='border   mx-8 h-[380px] rounded-xl shadow-xl'> 
                <Table className=' bg-white'>
                <TableCaption >Preview results</TableCaption>
                <TableHeader >
                    <TableRow>
                        <TableHead className="w-[90px] uppercase">S/N</TableHead>
                        <TableHead className="w-[180px] uppercase">course</TableHead>
                        <TableHead className='uppercase'>status </TableHead>
                        {/* <TableHead className='w-[90px]'>Exam</TableHead> */}
                    
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {results?.map((data:any, index:number) => (
                        <TableRow className={cn(index%2===1&&'bg-blue-50 hover:bg-blue-50','p-2 cursor-pointer')} key={index} onClick={()=>{
                            setCourse(data.courseCode)
                        }}>

                            <TableCell>{index+1}</TableCell>
                            <TableCell>{data?.courseCode.replace('-',' ').toUpperCase()}</TableCell>
                            <TableCell >
                                <Button type='submit' className={cn(data?.resultsAvailable?'bg-green-500 hover:bg-green-500 ':'bg-red-500 hover:bg-red-500','text-white p-2 font-semibold capitalize w-fit  ')}>
                                    {data?.resultsAvailable?'RECEIVED':'PENDING'}
                                </Button>
                            </TableCell>
                            {/* <TableCell className='capitalize'>{data?.exam}</TableCell> */}
                        
                        </TableRow>
                    ))}
                    {/* <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                    </TableRow> */}
                </TableBody>
                <TableFooter>
                    <TableRow >
                    
                    </TableRow>
                </TableFooter>
            
            </Table>
                {/* <ScrollBar color='red' className='w-[20px] text-tone2'/> */}
                    
                </ScrollArea>
        </div>
                <ViewResult className={'h-full w-fit'} course={course} semId={semId}/>
    </div>
        
  )
}

export default PreviewResultTable