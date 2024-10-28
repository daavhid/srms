

import DepartmentCourses from '@/components/courses/departmentCourses'
import Result from '@/components/staffs/Results'
import ViewResult from '@/components/staffs/viewResults'
import { CurrentUser, serverRole } from '@/lib/utils'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
    const user = await CurrentUser()
    const role = await serverRole()
    if(role !=='STAFF') {
        redirect('/dashboard')
    }
  return (
    <div className='py-16'>
        <div className='ml-8 text-xl font-semibold my-4'>
            Add Results        
        </div>
        <div className='p-8'>
                <Result user={user}/>
            
        </div>
        
        
    </div>
  )
}

export default page