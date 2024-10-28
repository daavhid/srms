import React from 'react'

import {Nunito_Sans} from 'next/font/google'
import { cn } from '@/lib/utils'
import { MdCheck } from "react-icons/md";



const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='bg-school bg-center  bg-cover  h-screen gap-3 relative 
    after:absolute after:-z-10 z-10  after:opacity-60 after:bg-black after:w-full after:h-full after:top-0 after:left-0'>
        <div className='flex md:flex-row flex-col items-center md:justify-around justify-evenly h-full z-30 '>
            <h1 className={cn('text-white md:hidden text-2xl font-semibold z-50')}>RESULT MANAGEMENT SYSTEM</h1>
            <div className={cn('text-white hidden md:block')}>
                <h1 className={cn('text-white  text-3xl font-bold z-50')}>RESULT MANAGEMENT SYSTEM</h1>
                <div className='flex gap-3 py-6 items-center'><MdCheck className='text-4xl font-bold text-green-400'/><span className='text-3xl font-light'>Result Upload</span></div>
                <div className='flex gap-3 py-6 items-center'><MdCheck className='text-4xl font-bold text-green-400'/><span className='text-3xl font-light'>Result procesing</span></div>
                <div className='flex gap-3 py-6 items-center'><MdCheck className='text-4xl font-bold text-green-400'/><span className='text-3xl font-light'>Result Download</span></div>
                <div className='flex gap-3 py-6 items-center'><MdCheck className='text-4xl font-bold text-green-400'/><span className='text-3xl font-light'>CGPA calculation</span></div>

            </div>

            {children}
        </div>
    </div>
  )
}

export default layout