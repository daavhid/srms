'use client'
import React, { useEffect, useState } from 'react'
import { BookAIcon, ChevronRight, LucideIcon } from 'lucide-react'
import { MdBook, MdLibraryBooks, MdPeople, MdPerson3, MdSchool } from "react-icons/md";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Colapse } from './collapsible';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';



const AdminSideBar = () => {
    const [selected,setSelected] = useState('/dashboard')
    const page = usePathname()
    useEffect(()=>{
        setSelected(page)

    },[page])
   
  return (
    <div className='mt-8 border-t border-t-gray-200 h-screen'>
        <ScrollArea  scrollHideDelay={300} className="h-[85%] mt-16 rounded-lg ">
            <div className='flex flex-col space-y-1  font-normal  text-white'>
                <Link onClick={()=>{setSelected(page)}} href={`/manage-courses`} className={cn('flex justify-between p-3  hover:bg-tone4 bg-tone2 z-30',(selected==='/manage-courses'||selected==='/add-courses')?'bg-tone4':'bg-transparent')}> 
                    <span>Course</span>
                </Link>
                <Link href={`/add-department-courses`} className={cn('flex justify-between p-3  hover:bg-tone4 z-30',(selected==='/add-department-courses'||selected==='/manage-departmentCourses')?'bg-tone4':'bg-transparent')}> 
                    <span>Assign Staff</span>
                </Link>
                <Link href={`/manage-students`} className={cn('flex justify-between p-3  hover:bg-tone4 bg-tone2 z-30',selected==='/manage-courses'?'bg-tone4':'bg-transparent')}> 
                    <span>Student</span>
                </Link>
                <Link href={`/manage-staffs`} className={cn('flex justify-between p-3  hover:bg-tone4 bg-tone2 z-30',selected==='/manage-courses'?'bg-tone4':'bg-transparent')}> 
                    <span>Staff</span>
                </Link>
                <Link href={`/add-departments`} className={cn('flex justify-between p-3  hover:bg-tone4 bg-tone2 z-30',selected==='/manage-courses'?'bg-tone4':'bg-transparent')}> 
                    <span>Department</span>
                </Link>
                <Link href={`/add-faculties`} className={cn('flex justify-between p-3  hover:bg-tone4 bg-tone2 z-30',selected==='/manage-courses'?'bg-tone4':'bg-transparent')}> 
                    <span>Faculty</span>
                </Link>
                <Link href={`/add-semesters`} className={cn('flex justify-between p-3  hover:bg-tone4 bg-tone2 z-30',selected==='/manage-courses'?'bg-tone4':'bg-transparent')}> 
                    <span>Semester</span>
                </Link>
                <Link href={`/add-sessions`} className={cn('flex justify-between p-3  hover:bg-tone4 bg-tone2 z-30',selected==='/manage-courses'?'bg-tone4':'bg-transparent')}> 
                    <span>Session</span>
                </Link>
                <Link href={`/preview-results`} className={cn('flex justify-between p-3  hover:bg-tone4 bg-tone2 z-30',selected==='/manage-courses'?'bg-tone4':'bg-transparent')}> 
                    <span>results</span>
                </Link>
            </div>
            <ScrollBar color='red'  orientation="vertical" />
        </ScrollArea>
        
    </div>
  )
}

export default AdminSideBar
