'use client'
import React, { useEffect, useState } from 'react'

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
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    
  } from "@/components/ui/select"
import { cn } from '@/lib/utils'
import { getAssignedStaffs, getSemester, getStaffs, getStudents } from '@/actions/general'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { PopoverContent } from '@radix-ui/react-popover'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { RiArrowLeftFill } from 'react-icons/ri'
// import DialogBox from '@/components/ui/shadComponents/DialogBox'


const ManageAssignedStaff = () => {
    const [results,setResults] = useState<any[]>([])
    const [semester,setSemester] = useState<any[]>([])
    const [semId,setSemId] = useState('')
    useEffect(()=>{
        const fetch = async()=>{
            const semesters = await getSemester()
            if(semesters){
                setSemester(semesters)
            }
            if(semId){

                const courses = await getAssignedStaffs(semId)
                setResults(courses)
            }

        }
        fetch()
    },[semId])
  return (
    <div className='border-2  w-[980px] border-tone6 m-8 mt-0  bg-white rounded-lg overflow-hidden'>
          
        <div className='flex justify-between border-b  px-4 py-2'>

            {/* <p className='text-xl text-gray-600 font-semibold'>Students</p> */}
            <Select onValueChange={(e)=>{
                setSemId(e)
            }} >                
                <SelectTrigger className='w-[13rem] border-tone6 border'>
                    <SelectValue onClick={(e)=>{console.log(e)}} placeholder="select semester" />
                </SelectTrigger>
                
                <SelectContent onCloseAutoFocus={(e)=>e.preventDefault()}>
                    {semester?.map((sem,index) => (
                        <div key={index}>
                            <SelectItem   value={sem.semesterCode}>{sem.semesterCode.replace('-',' ')}</SelectItem>
                        </div>
                    ))}
                    
                </SelectContent>
            </Select>
            <Link href={`/add-department-courses`} className='flex text-right justify-between items-center hover:underline  italic '> 
                    <RiArrowLeftFill/>
                    <span className='cursor-pointer '>Back to Assign staff</span>
            </Link> 
        </div>
        <ScrollArea className='h-[20rem]   border  mx-auto whitespace-nowrap overflow-hidden' >
            <Table className=' mx-auto relative '>
                <TableHeader >
                    <TableRow className='text-center'>
                        <TableHead className="w-[90px] font-medium uppercase text-center text-xs">S/N</TableHead>
                        <TableHead className=" uppercase text-sm">Course code</TableHead>
                        <TableHead className='  uppercase text-left text-sm'>Course Title</TableHead>
                        <TableHead className='  uppercase text-left text-sm'>Credit</TableHead>
                        <TableHead className=' uppercase  text-sm'>staff Assigned</TableHead>
                        <TableHead className=' uppercase  text-sm'>Email</TableHead>
                        <TableHead className=' uppercase  text-sm'>Department</TableHead>
                        <TableHead className=' uppercase  text-sm'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {results?.map((data:any, index:number) => (
                        <TableRow className={cn(index%2===1&&'bg-blue-50  hover:bg-blue-50')} key={index}>

                            <TableCell className='text-center'>{index+1}</TableCell>
                            <TableCell className='uppercase font-medium'>{data?.courseCode}</TableCell>
                            <TableCell className='uppercase font-medium'>{data?.courses?.title}</TableCell>
                            <TableCell className='uppercase text-center font-medium'>{data?.credit}</TableCell>
                            <TableCell className=' uppercase font-medium'>{data?.staffs?.title +' '+ data?.staffs?.firstName +' '+ data?.staffs?.lastName}</TableCell>
                            <TableCell className=' font-medium'>{data?.staffs?.email}</TableCell>
                            <TableCell className='uppercase font-medium'>{data?.departmentCode}</TableCell>
                            <TableCell className='uppercase font-medium'>
                            <Popover>
                                    <PopoverTrigger asChild>
                                        {/* <Button variant="outline">Open popover</Button> */}
                                        <Button   className='h-0 bg-amber-50 border-tone6 border text-black p-5 px-5 text-sm uppercase flex gap-1'><span className='text-xs'>Edit</span><ChevronDown size={16} className='text-xs text-tone6'/></Button>
                                    </PopoverTrigger>
                                    <PopoverContent side='left' className='w-fit shadow-md'>
                                        <div className='bg-white relative z-40 space-y-2 rounded-md flex flex-col'>
                                            {/* <DialogBox  text='delete'/> */}
                                            {/* <DialogBox  text='view'/> */}
                                        </div>
                                    </PopoverContent>
                                </Popover>
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
            </Table>
            <ScrollBar orientation='horizontal' className='relative z-20'/>
        </ScrollArea>
    </div>
  )
}

export default ManageAssignedStaff