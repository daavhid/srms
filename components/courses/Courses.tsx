'use client'
import React, { useEffect, useState } from 'react'
import { courseSchema } from '../../schemas'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { departmentProp } from '@/lib/props'

  

const Courses = () => {
     const [departments,setDepartments] = useState<departmentProp[]>([])
    useEffect(()=>{
        const fetch = async()=>{
            const data = await axios.get('/api/departments')
            console.log(data.data.departments)
            setDepartments(data?.data?.departments)
        }
        fetch()
        
    },[])
    const form = useForm<z.infer<typeof courseSchema>>({
        defaultValues: {
            code:"",
            title:"",
            department:''
        },
        resolver:zodResolver(courseSchema)
    })
    const router = useRouter()
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')
    const onSubmit =async (values:z.infer<typeof courseSchema>)=>{
        const course = {
            
            department:values.department.toLowerCase(),
            code:values.code.toLowerCase(),
            title:values.title.toLowerCase(),
            

        }
        console.log(course)
       try {
            const result = await axios.post('/api/courses',course)
            console.log(result)
            if(result.status === 201){
                
                toast.success(`${result.data?.message}`)
            }
        
       } catch (error:any) {
        console.log(error)
        toast.error(`${error?.response?.data?.error}`)
        
       }finally{
        form.reset()
       }
    }

  return (
    <div className=' border m-8 mt-0 bg-white rounded-xl'>
        <p className='px-8 py-4 border-b text-xl text-gray-600 font-semibold'>Add Courses </p>
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} 
    
                className=' p-8 flex flex-col gap-2 rounded-lg' >
                    <FormField
                    control={form.control}
                    name='department'
                    defaultValue=''
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Departments</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className='  text-muted-foreground'>
                                        <SelectValue onClick={(e)=>{console.log(e)}} placeholder="---select department code---" className='bg-black'/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent >
                                    {departments?.sort((a:any,b:any):number =>{if(a.departmentCode < b.departmentCode)return -1})?.map(department => (
                                        <div >
                                            <SelectItem className=''   value={department.departmentCode}>{department.departmentCode.toUpperCase()}</SelectItem>
                                        </div>
                                    ))}
                                   
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField
                    control={form.control}
                    name='code'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Code</FormLabel>
                            <FormControl >
                                <Input  className='w-full border-none ring-1 outline-none focus-visible:ring-offset-3 focus-visible:ring-1 ' placeholder='Enter code' type='number'  {...field}  />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField
                    control={form.control}
                    name='title'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl >
                                <Input  className='w-full border-none ring-1 outline-none focus-visible:ring-offset-3 focus-visible:ring-1 ' placeholder='introduction to code'  {...field}  />
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

export default Courses