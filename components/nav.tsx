'use client'
import React from 'react'

import UserImage from './userImage'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { logout } from '@/actions/logout'
import { FaCaretDown, FaMessage } from "react-icons/fa6";
import { MdNotifications, MdOutlineMail, MdOutlineNotifications } from "react-icons/md";
import { MdExitToApp } from "react-icons/md";

const Nav = ({user}:{user:any}) => {
    
  return (
    
    <div className='flex gap-3 items-center self-end  '>
        <div className='flex gap-1 '>
        <div className='flex flex-col items-center '>
            <span className='font-bold capitalize'>{user?.name}</span>
            <span className='text-sm capitalize text-muted-foreground '>{user?.role.toLowerCase()}</span>
        </div>
        <div className='h'>
                <DropDown/>
            </div>
        </div>
        <UserImage user={user}/>
        <MdOutlineMail className='text-black text-xl'/>
        <MdOutlineNotifications className='text-black text-xl'/>

    </div>
  )
}

const DropDown = ()=>{
    const onClick = () => {
        logout()
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='outline-none text-muted-foreground'><FaCaretDown/></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onClick} className='flex justify-between'><span>Log out </span><MdExitToApp/></DropdownMenuItem>
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Nav