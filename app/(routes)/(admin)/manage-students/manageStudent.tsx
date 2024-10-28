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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { cn } from '@/lib/utils'
import { getStaffs, getStudents } from '@/actions/general'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from '@/components/ui/button'
import { FaCirclePlus } from "react-icons/fa6";
import { ChevronDown } from 'lucide-react'


import { HiOutlineRefresh } from "react-icons/hi";
import { useRouter } from 'next/navigation'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Link from 'next/link'
import { RiArrowLeftFill } from 'react-icons/ri'




const ManageStudents = () => {
    const [results,setResults] = useState<any[]>([])
    const [refresh,setRefresh] = useState<boolean>(false)
    const router = useRouter()
    useEffect(()=>{
        const fetch = async()=>{

            const students = await getStudents()
            setResults(students)
        }
        fetch()
    },[refresh])
  return (
    <div className='w-full'>
        <p className='text-2xl mb-8 font-bold mx-8'>Manage Students </p>
        <div className='flex gap-3 mx-8 mb-3 justify-end items-center'>
        <Link href={`/add-students`} className='flex text-right justify-between items-center hover:underline  italic '> 
                    <RiArrowLeftFill/>
                    <span className='cursor-pointer '>Bact to Add Student</span>
            </Link> 
            {/* <DialogBox element={<Student/>}  text='ADD STUDENT'/> */}
            
            
        </div>

        
        <div className='border-2  border-tone6 m-8 mt-0 bg-white rounded-xl overflow-hidden'>
            {/* <p className='px-8 py-4 border-b text-xl text-gray-600 font-semibold'>Students</p> */}
            <ScrollArea className='h-[20rem] w-full' >
                <Table className=' mx-auto relative  '>
                    <TableHeader >
                        <TableRow className='text-center'>
                            <TableHead className="w-[90px] font-medium uppercase text-center text-xs">S/N</TableHead>
                            <TableHead className=" uppercase text-xs">First Name</TableHead>
                            <TableHead className='  uppercase text-left text-sm'>Last Name</TableHead>
                            <TableHead className=' uppercase text-center  text-sm'>Matric Number</TableHead>
                            <TableHead className=' uppercase  text-sm'>Email</TableHead>
                            <TableHead className=' uppercase text-center  text-sm'>Department</TableHead>
                            <TableHead className=' uppercase text-center text-sm'>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {results?.map((data:any, index:number) => (
                            <TableRow className={cn(index%2===1&&'bg-blue-50  hover:bg-blue-50')} key={index}>

                                <TableCell className='text-center'>{index+1}</TableCell>
                                <TableCell className='uppercase font-medium text-[13px]'>{data?.firstName}</TableCell>
                                <TableCell className='uppercase font-medium text-[13px]'>{data?.lastName}</TableCell>
                                <TableCell className='uppercase font-medium text-[13px]'>{data?.matric_number}</TableCell>
                                <TableCell className=' font-medium text-[13px]'>{data?.email}</TableCell>
                                <TableCell className='uppercase font-medium text-[13px]'>{data?.departments?.departmentCode}</TableCell>
                                <TableCell className='uppercase font-medium text-[13px]'>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        {/* <Button variant="outline">Open popover</Button> */}
                                        <Button variant='ghost'   className='h-0 bg-amber-50 border-tone6 border text-black p-5 px-5 text-sm uppercase flex gap-1'><span className='text-xs'>Edit</span><ChevronDown size={16} className='text-xs text-tone6'/></Button>
                                    </PopoverTrigger>
                                    <PopoverContent side='left' className='w-fit shadow-md'>
                                        <div className='bg-white relative z-40 space-y-2 rounded-md flex flex-col'>
                                            {/* <DialogBox element={<DepartmentCourses staffId={data?.id}/>}  text='Assign course'/>
                                            <DialogBox element={<DepartmentCourses staffId={data?.id}/>}  text='view'/> */}
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
                <ScrollBar orientation='horizontal' className='relative z-50'/>
            </ScrollArea>
        </div>
    </div>
  )
}

export default ManageStudents