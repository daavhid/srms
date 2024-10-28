'use client'
import React from 'react'
import {auth, signOut} from '@/auth'
import useRole from '@/hooks/useRole'
import { logout } from '@/actions/logout'
import Dashboard from '@/components/Dashboard'

const dashboardPage = () => {
    const onClick = () => {
        logout()
    }
    const role = useRole()
  return (
    <div className='py-16'>
        <div className='m-8 mb-1 flex '>
               <Dashboard user={role}/>
        </div>
        
        
    </div>
  )
}

export default dashboardPage