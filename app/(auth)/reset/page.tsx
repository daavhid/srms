'use client'
import { Button } from '@/components/ui/button'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ResetSchema } from '@/schemas'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdEmail, MdOutlineArrowOutward } from 'react-icons/md'
import { zodResolver } from '@hookform/resolvers/zod'
import { reset } from '@/actions/reset'

const resetPassword = () => {
    const [error,setError] = useState('')
    const [success,setSuccess ] = useState('')
    const form = useForm<z.infer<typeof ResetSchema>>({
        defaultValues:{
            email: "",
        },
        resolver:zodResolver(ResetSchema),
    })

    const isLoading = form.formState.isSubmitSuccessful

    const onSubmit = async(values:z.infer<typeof ResetSchema>)=>{
        try {
            const data = await reset(values)
            if(data?.error){
                setError(data.error)
            }
            if(data?.success){
                setSuccess(data.success)
            }
            console.log(data)
            
        } catch (error) {
            console.log(error)
        }
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
                                <Input className={cn(' outline-none border-none focus-visible:ring-0 rounded-none py-6  focus-visible:ring-transparent focus-visible:ring-offset-0  ')} type='email' placeholder='Email Address' {...field} disabled={isLoading}/>
                            </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        
                    )}/>
                    
                    
                    <Button type='submit' variant={'auth'} className=' my-6 py-5 rounded-none bg-sky-600 z-40 text-white text-xl' disabled={isLoading}>Reset Password</Button>
                
                    <Link href={'/login'} className='text-gray-300 text-center text-sm flex justify-center items-center'><span className='underline text-sky-100 hover:text-sky-400  cursor-pointer'>Back To Login</span></Link>


                </form>
        </Form>
    </div>
  )
}

export default resetPassword