
import RegisterCourse from '@/components/students/registerCourse'
import { CurrentUser, serverRole } from '@/lib/utils'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {
    const user = await CurrentUser()
    const role = await serverRole()
    if(role !=='STUDENT') {
        redirect('/dashboard')
    }
  return (
    <div className='py-16'>
        <div className='ml-8 text-xl font-semibold my-8'>
            Register courses
        </div>
            <RegisterCourse user = {user}/>       
        
    </div>
  )
}

export default page