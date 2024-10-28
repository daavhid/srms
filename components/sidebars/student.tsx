'use client'
import React, { useState } from 'react'
import { BookAIcon, ChevronRight, LucideIcon } from 'lucide-react'
import { MdBook, MdLibraryBooks, MdPeople, MdPerson3, MdSchool } from "react-icons/md";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Colapse } from './collapsible';
import Link from 'next/link';



const StaffSideBar = () => {
   
  return (
    <div className='mt-8 border-t border-t-gray-200 h-screen'>
        <ScrollArea  scrollHideDelay={300} className="h-[85%] mt-16 rounded-lg ">
            <div className='flex flex-col space-y-1  font-normal  text-white'>
                <Link href={`/register-course`} className='flex justify-between p-3  hover:bg-tone4 bg-tone2 z-30'> 
                    <span>Register Course</span>
                </Link>
                <Link href={`/view-result`} className='flex justify-between p-3  hover:bg-tone4 bg-tone2 z-30'> 
                    <span>View Result</span>
                </Link>
            </div>
            <ScrollBar color='red'  orientation="vertical" />
        </ScrollArea>
    </div>
  )
}

export default StaffSideBar
