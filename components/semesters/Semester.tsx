'use client'
import React, { useEffect, useState } from 'react'
import { courseSchema, facultySchema, semesterSchema } from '../../schemas'
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
    sessionCode:string,
    endDate:Date,
    startDate:Date
}

const semesters = [
    {
        name:'Harmattan',
        value:'Harmattan'
    },
    {
        name:'Rain',
        value:'Rain'
    },
]
const Semester = () => {
    const [sessions,setSessions] = useState<sessionProp[]>([])
    const [selectedSession,setSelectedSession] = useState('')

    useEffect(()=>{
        const fetch = async()=>{
            const data = await axios.get('/api/session')
            console.log(data.data.sessions)
            setSessions(data?.data?.sessions)
        }
        fetch()

    },[])
    const form = useForm<z.infer<typeof semesterSchema>>({
        resolver:zodResolver(semesterSchema)
    })
    const router = useRouter()
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')
    const onSubmit =async (values:z.infer<typeof semesterSchema>)=>{
        const Semester = {
            name:values.name.toLowerCase(),
            startDate:values.startDate,
            endDate:values.endDate,
            sessionCode:values.sessionCode.toLowerCase(),
        }
        console.log(Semester)
       try {
            const result = await axios.post('/api/semester',Semester)
            console.log(result)
            if(result.status === 201){
                toast.success('Semester Added',{
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
        <p className='px-8 py-4 border-b text-xl text-gray-600 font-semibold'>Add Semester </p>
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} 
    
                className=' p-8 flex flex-col gap-2 rounded-lg' >
                    <FormField
                    control={form.control}
                    name='name'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Semester Name</FormLabel>
                            <Select onValueChange={field.onChange}  defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue onClick={(e)=>{console.log(e)}} placeholder="----choose semester----" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent >
                                    {semesters.map(semester => (
                                        <div >
                                            <SelectItem   value={semester.value}>{semester.name}</SelectItem>
                                        </div>
                                    ))}
                                   
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField
                    control={form.control}
                    name='sessionCode'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Session Code</FormLabel>
                            <Select onValueChange={field.onChange} onOpenChange={()=>{setSelectedSession(field.value)}} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue onClick={(e)=>{console.log(e)}} placeholder="----choose session----" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent >
                                    {sessions.map(session => (
                                        <div >
                                            <SelectItem   value={session.sessionCode}>{session.sessionCode}</SelectItem>
                                        </div>
                                    ))}
                                   
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                
                    <FormField 
                    control={form.control}
                    name='startDate'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <Date location='semester' value={field.value} onChange={field.onChange} selectedSession={selectedSession} />
                            <FormMessage/>
                        </FormItem>
                        
                    )}/>
                    <FormField 
                    control={form.control}
                    name='endDate'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <Date location='semester'  value={field.value} onChange={field.onChange} selectedSession={selectedSession} />
                            <FormMessage/>
                        </FormItem>
                        
                    )}/>
                    
                    <Button type='submit' variant={'auth'} className=' w-fit rounded-md mt-6 py-5  bg-sky-600 z-40 text-white text-xl' >Add</Button>
                </form>
           </Form>
        
    </div>
  )
}

export default Semester