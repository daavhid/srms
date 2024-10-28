'use client'
import React, { useEffect, useState } from 'react'
import * as z from 'zod'
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
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from 'lucide-react'
import { departmentProp } from '@/lib/props'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import DropDown from '../shadComponents/DropDown'
import { levels } from '@/constants'
import { resultSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import ViewResult from './viewResults'
import { result } from '@/actions/sendResult'
import { getSemester, getStaff, staffDepartmentCourses } from '@/actions/general'

interface Ilabel{
    value:string
}

const Result = ({user}:{user:any})=>{
    const[courses,setCourses] = useState<any[]>([])
    const[course,setCourse] = useState('')
    const [staff,setStaff] = useState<any>(null)
    // const [semesters,setSemester] = useState<Ilabel[]>([])
    const [students,setStudents] = useState<any[]>([])
    const [courseRegId,setCourseRegId] = useState(null)
    const [courseId,setCourseId] = useState(null)
    const [refetch,setRefetch] = useState(false)
    const [semesterCode,setSemesterCode] = useState('')
    const [semester,setSemester] = useState<any[]>([])
    const [open, setOpen] = useState(false)
    useEffect(()=>{
        const fetch = async()=>{
            const semesters = await getSemester()
            if(user){
                console.log(user,'this is the user')

                if(semesters){
                    setSemester(semesters)
                }
                const stuData = await axios.get(`/api/studentCourseReg?course=${course}`)
                setStudents(stuData?.data?.students)
                console.log(stuData?.data?.students,'thi is the studnt')
                const data = await getStaff(user?.email)
                setStaff(data)
                console.log(data,'this is data')
                const coursesData = await staffDepartmentCourses(data?.id,semesterCode)
               
                setCourses(coursesData)
            }
        }
        fetch()
    },[user,course,semesterCode])
    

    const form = useForm<z.infer<typeof resultSchema>>({
        defaultValues: {
        },
        resolver:zodResolver(resultSchema)
    })

    const sendResult = async()=>{
        try {
            
            const resultData = await result(course,semester[0]?.semesterCode)
            console.log(resultData,'this is from the client')
            if(resultData.message){
                toast.success(`${resultData?.message}`)
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    const onSubmit =async (values:z.infer<typeof resultSchema>)=>{
        const resultData = {
            courseRegId:courseRegId,
            courseId:courseId,
            matric_number:values.matric_number,
            ca:Number(values.ca),
            exam:Number(values.exam),
        }
        console.log(resultData,'this is the reut')
       try {
            const result = await axios.post('/api/result',resultData)
            console.log(result)
            if(result.status === 201){
                setRefetch(prev=>!prev)
                toast.success(`${result.data?.message}`)
            }
        
       } catch (error:any) {
        console.log(error)
        toast.error(`${error?.response?.data?.error}`)
        
       }
       finally{
        form.resetField('matric_number')
        form.resetField('ca')
        form.resetField('exam')
       }
    }
    
    return(
        <div className=' grid grid-cols-3 space-x-6'>
            <div className='border-2 border-tone6 relative bg-white h-[380px]  col-span-2 rounded-xl shadow-xl'> 
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} 
        
                    className=' bg-white  p-4 flex flex-col mt-16 gap-2 rounded-lg' >
                        <div className='grid grid-cols-3 space-x-4  '>
                        <FormField
                            control={form.control}
                            name='semesterCode'
                            defaultValue=''
                            render={({field})=>(
                                <FormItem>
                                    {/* <FormLabel>Semester</FormLabel> */}
                                    <Select onValueChange={field.onChange} onOpenChange={()=>{setSemesterCode(field.value)}} value={field.value}  defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className='ring-0 border border-tone6 border-t-0 border-x-0 border-b outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-b-tone6'> 
                                                <SelectValue onClick={(e)=>{console.log(e)}} placeholder="select semester" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <DropDown properties={semester}  />
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                            <FormField
                            control={form.control}
                            name='courseCode'
                            defaultValue=''
                            render={({field})=>(
                                <FormItem>
                                    {/* <FormLabel>Courses</FormLabel> */}
                                    <Select onValueChange={field.onChange} onOpenChange={()=>{setCourse(field.value)}} value={field.value}>
                                        <SelectTrigger className=' ring-0 border border-tone6 border-t-0 border-x-0 border-b border-b-tone6 outline-none focus-visible:ring-0 focus-visible:ring-offset-0  '>
                                            <SelectValue className='' onClick={(e)=>{console.log(e)}} placeholder="select course" />
                                        </SelectTrigger>
                                        <SelectContent className='' onCloseAutoFocus={(e)=>e.preventDefault()}>
                                            {courses?.map((course:any,index:number)=>(
                                                <SelectItem value={course?.courses?.courseCode} key={index}>{course?.courses?.courseCode?.toUpperCase()}</SelectItem>
                                            ))}
                                            
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                            <FormField
                            control={form.control}
                            name='matric_number'
                            render={({field})=>(
                                <FormItem>
                                    {/* <FormLabel>fetch student</FormLabel> */}
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <FormControl className=''>
                                                <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={true}
                                                className="  border border-tone6 w-full text-left"
                                                >
                                                {field.value
                                                    ? students.find((student) => student?.matric_number === field.value)?.matric_number.toUpperCase()
                                                    : "select student"}
                                                <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full border border-tone6 p-0">
                                            <Command>
                                            <CommandInput placeholder="Search Students..." />
                                            <CommandList>
                                                <CommandEmpty>No Student found.</CommandEmpty>
                                                <CommandGroup>
                                                {students?.map((student) => (
                                                    <CommandItem
                                                    key={student?.matric_number}
                                                    value={student?.matric_number}
                                                    onSelect={(currentValue) => {
                                                        form.setValue('matric_number', student?.matric_number);
                                                        setCourseId(student?.departmentCourseId)
                                                        setCourseRegId(student?.id)
                                                        setOpen(false)
                                                    
                                                    }}
                                                    >
                                                    <Check
                                                        className={cn(
                                                        "mr-2 h-4 w-4",
                                                        student.matric_number === field.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {student.matric_number.toUpperCase()}
                                                    </CommandItem>
                                                ))}
                                                </CommandGroup>
                                            </CommandList>
                                            </Command>
                                        </PopoverContent>
                                        </Popover>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        </div>
                        <div className='flex space-x-4 items-center mt-10'>

                            <FormField
                            control={form.control}
                            name='ca'
                            defaultValue=''
                            render={({field})=>(
                                <FormItem>
                                    <FormControl >
                                        <Input  className=' w-36 ring-0 border-t-0 border-x-0 border-b outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-b-tone6  ' placeholder='Enter C.A Score' type='number'  {...field} onKeyDownCapture={(e) =>["e", "E", "+", "-"].includes(e.key) && e.preventDefault()} min={0} max={40} pattern='\d{2}' />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                            <FormField
                            control={form.control}
                            name='exam'
                            defaultValue=''
                            render={({field})=>(
                                <FormItem>
                                    {/* <FormLabel>Exam</FormLabel> */}
                                    <FormControl >
                                        <Input  className=' w-36 ring-0 border-t-0 border-x-0 border-b outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-b-tone6  ' placeholder='Enter Exam Score' type='number'  {...field} onKeyDownCapture={(e) =>["e", "E", "+", "-"].includes(e.key) && e.preventDefault()} min={0} max={60} pattern='\d{2}' />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                            <Button type='submit' variant={'ghost'} className=' w-fit rounded-md border border-tone6   bg-tone6 z-40 text-white ' >Add Result</Button>
                            <Button type='submit' variant={'ghost'} onClick={()=>{
                sendResult()
            }} className='   rounded-md    bg-purple-600 border border-tone6 z-40 text-white '>Send Result</Button>
                        </div>
                    </form>
            </Form>
            
                
            </div>
        <ViewResult  course={course} refresh={refetch}/>
        </div>
    )
}

export default Result