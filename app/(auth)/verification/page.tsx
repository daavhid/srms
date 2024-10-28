'use client'

import { verifyToken } from '@/actions/verification'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import {BeatLoader} from 'react-spinners'

const VerificationPage = () => {
    const searchParam = useSearchParams()
    const router = useRouter()
    const token = searchParam.get("token")
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')

    const onSubmit = useCallback(()=>{
        verifyToken(token)
        .then(data=>{
            console.log(data)
            if(data?.error){
                setTimeout(()=>{

                    setError(data.error)
                },2000)
            }
            if(data?.success){
                setTimeout(()=>{

                    setError(data.success)
                },2000)
                router.push('/login')

            }
        })
    },[token])

    useEffect(()=>{
        onSubmit()
    },[onSubmit])
    
  return (
    <div className='text-muted-foreground rounded-lg shadow-lg p-8 text-center bg-white'>
        <h1 className='mb-8 font-medium text-gray-900 text-xl'>Confirming Your Verification</h1>
        {error && <p className='bg-red-500 my-2 text-white w-full text-center py-4 px-2'>{error}</p>}
        {success && <p className='bg-green-500 my-2 text-white w-full text-center py-4 px-2'>{success}</p>}
        {!error && !success &&<BeatLoader className='my-4'/>}
        <Link href={'/login'} className='cursor-pointer text-slate-900 font-semibold underline'>Back to Login</Link>
        
    </div>
  )
}

export default VerificationPage