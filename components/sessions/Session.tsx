'use client'
import React, { useEffect, useState } from 'react'
import {  sessionSchema } from '../../schemas'
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
import Date from '../shadComponents/Date'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

interface sessionProp {
    sessionCode:string
}
const Session = () => {
    const form = useForm<z.infer<typeof sessionSchema>>({
        resolver:zodResolver(sessionSchema)
    })
    const onSubmit =async (values:z.infer<typeof sessionSchema>)=>{
        const session = {
            startDate:values.startDate,
            endDate:values.endDate,
        }
        console.log(session)
       try {
            const result = await axios.post('/api/session',session)
            console.log(result)
            if(result.status === 201){
                toast.success('session Added',{
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
        <p className='px-8 py-4 border-b text-xl text-gray-600 font-semibold'>Add Session </p>
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} 
    
                className=' p-8 flex flex-col gap-2 rounded-lg' >
                    <FormField 
                    control={form.control}
                    name='startDate'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <Date value={field.value} onChange={field.onChange} />
                            <FormMessage/>
                        </FormItem>
                        
                    )}/>
                    <FormField 
                    control={form.control}
                    name='endDate'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <Date value={field.value} onChange={field.onChange} />
                            <FormMessage/>
                        </FormItem>
                        
                    )}/>
                    
                    <Button type='submit' variant={'auth'} className=' w-fit rounded-md mt-6 py-5  bg-sky-600 z-40 text-white text-xl' >Add</Button>
                </form>
           </Form>
        
    </div>
  )
}

export default Session