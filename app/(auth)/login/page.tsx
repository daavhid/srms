'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { roboto } from '../register/page'
import { signInSchema } from '@/schemas'
import * as z from 'zod'
import axios from 'axios'
import { Router } from 'next/router'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { login } from '@/actions/login'
import Link from 'next/link'
import { MdEmail, MdOutlineArrowOutward } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'



const loginPage = () => {

    const router = useRouter()
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')

    useEffect(()=>{
        setTimeout(()=>{
         setError('')
         setSuccess("")
         
        },3000) 
     },[error,success])

    const form = useForm<z.infer<typeof signInSchema>>({
        defaultValues: {
            email:"",
            password:""
        },
        resolver:zodResolver(signInSchema)
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit =async (values:z.infer<typeof signInSchema>)=>{
       
        try {
            const data = await login(values)
            if(data?.error){
                setError(data.error)
            }
            if(data?.success){
                setSuccess(data.success)
                router.push('dash')
            }
            console.log(data)
            
        } catch (error) {
            console.log(error)
        }finally{
            
        }
        //

    }
    return (
        <div className='md:w-[30%] w-[300px] z-30 px-4 '>
            {success &&<p className='bg-green-600 my-5 text-white w-full text-center py-4 px-2'>{success}</p>}
            {error&&<p className='w-full text-center my-6 bg-red-600 py-4 px-2 text-white font-semibold'>{error}</p>}
           <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} 
    
                className='shadow-2xl flex flex-col gap-2 rounded-lg' >
                    <FormField
                    control={form.control}
                    name='email'
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                            <div className='bg-white flex items-center px-2 '>
                                <MdEmail className=' w-5 h-5'/>
                                <Input className={cn(roboto.className,' font-[500] outline-none border-none focus-visible:ring-0 rounded-none py-6  focus-visible:ring-transparent focus-visible:ring-offset-0  ')} type='email' placeholder='Email Address' {...field} disabled={isLoading}/>
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
                                <Input className={cn(roboto.className,' font-[500] outline-none border-none focus-visible:ring-0 rounded-none py-6  focus-visible:ring-transparent focus-visible:ring-offset-0  ')} type='password' placeholder='Password' {...field} disabled={isLoading}/>
                            </div>   
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    
                    <Button type='submit' variant={'auth'} className=' my-6 py-5 rounded-none bg-sky-600 z-40 text-white text-xl' disabled={isLoading}>Log In</Button>
                    <Link href={'/reset'} className='text-sm flex justify-center items-center  '><span className='cursor-pointer hover:text-sky-400 text-gray-300'> Forgot password?</span></Link>
                    <Link href={'/register'} className='text-gray-300 text-center text-sm flex justify-center items-center'>Don&apos;t have an account? &nbsp;<span className='underline text-sky-400  cursor-pointer'>Register</span></Link>

    
                </form>
           </Form>
        </div>
      )
}


export default loginPage