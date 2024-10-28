


import Faculty from '@/components/faculties/Faculty'
import { serverRole } from '@/lib/utils'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { RiArrowRightFill } from 'react-icons/ri'

const page = async () => {
    const role = await serverRole()
    if(role !=='ADMIN') {
        redirect('/dashboard')
    }
  return (
    <div className='py-16'>
       <div className='m-8 mb-1 flex justify-end'>
            <Link href={`/manage-courses`} className='flex text-right justify-between items-center hover:underline  italic '> 
                <span className='cursor-pointer '>Manage Courses</span>
                <RiArrowRightFill/>
            </Link>   
        </div>
        <Faculty/>
    </div>
  )
}

export default page