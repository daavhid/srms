import React from 'react'
import AdminSideBar from './sidebars/admin'
import StaffSideBar from './sidebars/staff'
import StudentSideBar from './sidebars/student'
import Image from 'next/image'
import {Outfit} from 'next/font/google'
import { cn } from '@/lib/utils'



const SideBar = ({user}:{user:string}) => {
  return (
    <div>
        
        {user === 'SUPERADMIN'&&<AdminSideBar/>}
        {user === 'ADMIN'&&<AdminSideBar/>}
        {user === 'STAFF'&&<StaffSideBar/>}
        {user === 'STUDENT'&&<StudentSideBar/>}
    </div>
  )
}

export default SideBar