import { auth } from '@/auth'
import Navbar from '@/components/Navbar'
import SideBar from '@/components/sidebar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn, serverRole } from '@/lib/utils'
import { Fira_Sans } from 'next/font/google'
import Image from 'next/image'
import React from 'react'





const layout = async({children}:{children:React.ReactNode}) => {
    const role = await serverRole()
  return (
    <div className=' '>
        <div className={cn('flex min-h-screen    ')}>
            <div className='bg-[#ff6a55]  pb-8 z-[100] fixed left-0 text-white w-[300px] h-screen px-3'>
                <ScrollArea>
                    
                    <div className='flex items-center font-semibold gap-2 py-2'>
                        <Image src={'/lautech.png'} alt='logo' width={30} height={30}/>
                        <p className={cn('text-xs ')}>RESULT MANAGEMENT SYSTEM</p>
                    </div>
                    <div className='z-[100] '>

                        <SideBar user={role as string}/>
                    </div>
                </ScrollArea>
        

            </div>
            <div className='flex-1 min-h-screen ml-[300px] bg-gray-100'>
                <Navbar/>
                {children}
            </div>
        </div>
    </div>
  )
}

export default layout