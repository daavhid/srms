'use client'
import React, { useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"

interface IcollapseProps {
    text:string,
    Icon:LucideIcon,
    Icon1:IconType,
    path:string,
    path1:string
}

import { BookAIcon, ChevronRight, LucideIcon } from 'lucide-react'
import { IconType } from 'react-icons/lib'
import Link from 'next/link'
export const Colapse = ({text,Icon,Icon1,path,path1}:IcollapseProps)=>{
    const [isOpen,setIsOpen] = useState(false)
    return(
        <Collapsible  className='bg-black/90 my-1'>
            <CollapsibleTrigger className='flex  border-[1.5px] border-x-0 border-tone2 first-of-type:border-0 last-of-type:border-b-0  p-3 px-8 shadow-sm w-full duration-200 items-center justify-between'>
                <Icon1/>
                <p>{text}</p>
                <ChevronRight size={15} className='text-sm '/>
            </CollapsibleTrigger>
            <CollapsibleContent   className='bg-tone2 shadow-inner text-gray-600'>
               <ul>
                    <Link href={`/${path}`} className='flex justify-between p-3 px-8 hover:bg-tone4 z-30'> 
                        <Icon size={20}/>
                        <span>Add {text}</span>
                    </Link>
                    <Link href={`/${path1}`} className='flex justify-between p-3 px-8 hover:bg-tone4 z-30'>  
                        <Icon className='text-sm' size={20}/>
                        <span>Manage {text}</span>
                    </Link>
                    
               </ul>
            </CollapsibleContent>
        </Collapsible>
    )
}