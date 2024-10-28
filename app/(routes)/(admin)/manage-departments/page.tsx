


import { serverRole } from '@/lib/utils'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
    const role = await serverRole()
    if(role !=='ADMIN') {
        redirect('/dashboard')
    }
  return (
    <div>
       manage departments in the database
    </div>
  )
}

export default page