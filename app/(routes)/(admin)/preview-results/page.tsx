
import Courses from '@/components/courses/Courses'
import PreviewResultTable from '@/components/shadComponents/previewResult'
import { serverRole } from '@/lib/utils'
import { ChevronRight, MoveRightIcon } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { FaRegSquareCaretRight } from 'react-icons/fa6'
import { RiArrowRightFill } from 'react-icons/ri'

const page = async () => {
    const role = await serverRole()
    if(role !=='ADMIN') {
        redirect('/dashboard')
    }
  return (
    <div className='pt-16 pb-10'>

        <PreviewResultTable/>        
    </div>
  )
}

export default page