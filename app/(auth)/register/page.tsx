'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {zodResolver} from "@hookform/resolvers/zod"
import { Roboto,Montserrat, Mochiy_Pop_One, Nunito_Sans } from 'next/font/google'
import axios, { AxiosError } from "axios"
import {MdVpnKey, MdPerson,MdEmail, MdOutlineArrowOutward} from 'react-icons/md'

import { RiLockPasswordFill } from "react-icons/ri";




import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PassThrough } from 'stream'
import { useRouter } from 'next/navigation'
import { registerSchema } from '@/schemas'
import Link from 'next/link'



const registerPage = () => {
    const router = useRouter()
    const [pending,setPending] = useState(false)
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')

    useEffect(()=>{
        setTimeout(()=>{
         setError('')
        },3000) 
     },[error,success])

    const form = useForm<z.infer<typeof registerSchema>>({
        defaultValues: {
            username:'',
            email:"",
            password:"",
            key:''
        },
        resolver:zodResolver(registerSchema)
    })

    // const errmsg = form.formState.errors
   
         let isLoading = form.formState.isSubmitting 
         if(form.formState.isSubmitSuccessful && success){
            isLoading  = true
         }

    const onSubmit =async (values:z.infer<typeof registerSchema>)=>{

        const user = {
            username:values.username,
            email:values.email,
            password:values.password,
        }
        try {
            const res = await axios.post('/api/register',user)
            console.log(res)
            if(res.status === 201){
               setSuccess(res.data.message)
                // router.push('/login')
            }else{
                console.log(res.data.message)
                setError(res.data.message)
            }

            
        } catch (error:any) {
            
            setError(error?.response.data.message)
        }
        //

    }
  return (
    <div className='md:w-[30%] w-[300px] z-30 px-4'>
         {error&&<p className='w-full text-center my-6 bg-red-600 py-4 px-2 text-white font-semibold'>{error}</p>}
        {success &&<p className='bg-green-600 my-5 text-white w-full text-center py-4 px-2'>{success}</p>}
       <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} 

            className='shadow-2xl flex flex-col gap-2 rounded-lg' >
                <FormField
                control={form.control}
                name='username'
                render={({field})=>(
                    <FormItem>
                        <FormControl>
                            <div className='bg-white flex items-center px-2 '>
                                <MdPerson className='  w-6 h-6 '/>
                                <Input className={cn(' outline-none border-none rounded-none py-6  focus-visible:ring-transparent focus-visible:ring-offset-0   ')} placeholder='Username' {...field} disabled={isLoading}/>
                            </div>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField
                control={form.control}
                name='email'
                render={({field})=>(
                    <FormItem>
                        
                        <FormControl>
                            <div className='bg-white flex items-center px-2 '>
                                <MdEmail className=' w-5 h-5'/>
                                <Input className={cn(' outline-none border-none focus-visible:ring-0 rounded-none py-6  focus-visible:ring-transparent focus-visible:ring-offset-0  ')} type='email' placeholder='Email Address' {...field} disabled={isLoading}/>
                            </div>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField
                control={form.control}
                name='password'
                render={({field})=>(
                    <FormItem>
                       
                        <FormControl>
                            <div className='bg-white flex items-center px-2 '>
                                <RiLockPasswordFill  className='h-5 w-5'/>
                                <Input className={cn(' outline-none border-none focus-visible:ring-0 rounded-none py-6  focus-visible:ring-transparent focus-visible:ring-offset-0  ')} type='password' placeholder='Password' {...field} disabled={isLoading}/>
                            </div>                        
                        </FormControl>
                           
                        <FormMessage/>
                        
                    </FormItem>
                )}/>
                <FormField
                control={form.control}
                name='key'
                render={({field})=>(
                    <FormItem>
                        
                        <FormControl>
                            <div className='bg-white flex items-center px-2 '>
                                <MdVpnKey className='h-5 w-5'/>
                                <Input className={cn(' outline-none border-none focus-visible:ring-0 rounded-none py-6 focus-visible:ring-transparent focus-visible:ring-offset-0  ')} type='password' placeholder='Secret Key' {...field} disabled={isLoading}/>
                            </div>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                
                <Button type='submit' variant={'auth'} className=' my-5 py-5 rounded-none bg-sky-600 z-40 text-white text-xl' disabled={isLoading}>Register</Button>
                <Link href={'/login'} className='text-gray-200 text-center text-sm flex justify-center items-center'>Already have an account? &nbsp;<span className='underline text-sky-400 '>Log In </span></Link>

            </form>
       </Form>
    </div>
  )
}

export default registerPage