'use client'
import React, { useState } from 'react'
import { courseSchema, facultySchema } from '../../schemas'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
// import { cn } from '@/lib/utils'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

const Faculty = () => {
    const form = useForm<z.infer<typeof facultySchema>>({
        defaultValues: {
            code:"",
            name:""
        },
        resolver:zodResolver(facultySchema)
    })
    const router = useRouter()
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')
    const onSubmit =async (values:z.infer<typeof facultySchema>)=>{
        const faculty = {
            name:values.name.toLowerCase(),
            code:values.code.toLowerCase(),
        }
       try {
            const result = await axios.post('/api/faculty',faculty)
            console.log(result)
            if(result.status === 201){
                toast.success('Faculty Added',{
                    theme:'colored'
                })
            }else{
                
            }
        
       } catch (error:any) {
        toast.error(`${error?.response?.data?.error}`,{
            theme:'colored'
        })
        
       }finally{
        form.reset()
       }
    }

  return (
    <div className=' border m-8 mt-0 bg-white rounded-xl '>
        <p className='px-8 py-4 border-b text-xl text-gray-600 font-semibold'>Add Faculty </p>
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} 
    
                className=' p-8 flex flex-col gap-2 rounded-lg' >
                    <FormField
                    control={form.control}
                    name='name'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Faculty Name</FormLabel>
                            <FormControl >
                                <Input  className='w-full border-none ring-1 outline-none focus-visible:ring-offset-3 focus-visible:ring-1 ' placeholder='introduction to code'  {...field}  />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField 
                    control={form.control}
                    name='code'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Faculty Code</FormLabel>
                            <FormControl >
                                <Input className='w-full border-none ring-1 outline-none focus-visible:ring-offset-3 focus-visible:ring-1 '  placeholder='fci'  {...field}  />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        
                    )}/>
                    
                    <Button type='submit' variant={'auth'} className=' w-fit rounded-md mt-6 py-5  bg-sky-600 z-40 text-white text-xl' >Add</Button>
                    

    
                </form>
           </Form>
        
    </div>
  )
}

export default Faculty