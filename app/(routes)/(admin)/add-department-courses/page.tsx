

import DepartmentCourses from '@/components/courses/departmentCourses'
import { CurrentUser, serverRole } from '@/lib/utils'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { RiArrowRightFill } from 'react-icons/ri'

const page = async () => {
    const user = await CurrentUser()
    const role = await serverRole()
    if(role !=='ADMIN') {
        redirect('/dashboard')
    }
  return (
    <div className='py-16'>
        <div className='m-8 mb-1 flex justify-end'>
            <Link href={`/manage-departmentCourses`} className='flex text-right justify-between items-center hover:underline  italic '> 
                <span className='cursor-pointer '>Manage assigned staff</span>
                <RiArrowRightFill/>
            </Link>   
        </div>
        <DepartmentCourses user={user}/>
        
    </div>
  )
}

export default page