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
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { cn } from '@/lib/utils'
import { getStaffs } from '@/actions/general'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from '@/components/ui/button'
// import Staff from './Staff'
import { HiOutlineRefresh } from 'react-icons/hi'
import { FaCirclePlus } from 'react-icons/fa6'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { RiArrowLeftFill } from 'react-icons/ri'
// import DialogBox from '@/components/ui/shadComponents/DialogBox'
// import DepartmentCourses from '@/components/ui/courses/departmentCourses'


const ManageStaff = () => {
    const [results,setResults] = useState<any[]>([])
    const [refresh,setRefresh] = useState<boolean>(false)
    useEffect(()=>{
        const fetch = async()=>{

            const staffs = await getStaffs()
            setResults(staffs)
        }
        fetch()
    },[refresh])
  return (
    <div className='w-full'>
        <p className='text-2xl mb-8 font-bold mx-8'>Manage Staffs </p>
        <div className='flex gap-3 mx-8 mb-3 justify-end items-center'>
            {/* <DialogBox element={<Staff/>} text='ADD STAFF'/> */}
            <Link href={`/add-staffs`} className='flex text-right justify-between items-center hover:underline  italic '> 
                    <RiArrowLeftFill/>
                    <span className='cursor-pointer '>Bact to Add Staff</span>
            </Link> 
            {/* <HiOutlineRefresh size={20} className={cn('  text-muted-foreground cursor-pointer hover:spin-in-3',(refresh)?'animate-spin':'animate-none')} onClick={()=>{
                setRefresh(true)
                setTimeout(()=>{
                    setRefresh(false)

                },1000)
            }}/> */}
        </div>

        <div className='border-2 border-tone6 m-8 mt-0 bg-white rounded-xl'>
            {/* <p className='px-8 py-4 border-b text-xl text-gray-600 font-semibold'>Staffs</p> */}
            <ScrollArea className='h-[20rem]'>
                <Table className=' mx-auto relative '>
                    <TableHeader >
                        <TableRow className=''>
                            <TableHead className="w-[90px] font-medium uppercase text-center text-xs">S/N</TableHead>
                            <TableHead className=" uppercase text-sm">Title</TableHead>
                            <TableHead className='uppercase  text-sm'>First Name</TableHead>
                            <TableHead className=' uppercase text-left text-sm'>Last Name</TableHead>
                            <TableHead className=' uppercase  text-sm'>Email</TableHead>
                            <TableHead className=' uppercase  text-sm'>Department</TableHead>
                            <TableHead className=' uppercase  text-sm'>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {results?.map((data:any, index:number) => (
                            <TableRow className={cn(index%2===1&&'bg-blue-50  hover:bg-blue-50')} key={index}>

                                <TableCell className='text-center'>{index+1}</TableCell>
                                <TableCell className='uppercase font-medium'>{data?.title}</TableCell>
                                <TableCell className='uppercase font-medium'>{data?.firstName}</TableCell>
                                <TableCell className='uppercase font-medium'>{data?.lastName}</TableCell>
                                <TableCell className=' font-medium'>{data?.email}</TableCell>
                                <TableCell className='uppercase font-medium'>{data?.departments?.name}</TableCell>
                                <TableCell className='uppercase font-medium text-[13px]'>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        {/* <Button variant="outline">Open popover</Button> */}
                                        <Button   className='h-0 bg-amber-50 border-tone6 border text-black p-5 px-5 text-sm uppercase flex gap-1'><span className='text-xs'>Edit</span><ChevronDown size={16} className='text-xs text-tone6'/></Button>
                                    </PopoverTrigger>
                                    <PopoverContent side='left' className='w-fit shadow-md'>
                                        <div className='bg-white relative z-40 space-y-2 rounded-md flex flex-col'>
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
                <ScrollBar orientation='horizontal'/>
            </ScrollArea>
        </div>
    </div>
  )
}

export default ManageStaff