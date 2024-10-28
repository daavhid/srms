'use client'
import React, { useEffect, useState } from 'react'
import { departmentCourseSchema } from '../../schemas'
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
import { getSemester, getStaff } from '@/actions/general'

interface Ilabel{
    value:string
}

interface Istaff{
    id:number
    name:string
}
  

const DepartmentCourses = ({user}:{user:any}) => {
  
     const [department,setDepartment] = useState('csc')
     const [departments,setDepartments] = useState<departmentProp[]>([])
     const [semesters,setSemester] = useState<any[]>([])
     const [courses,setCourses] = useState<Ilabel[]>([])
     const [staffs,setStaffs] = useState<Istaff[]>([])
    useEffect(()=>{
        const fetch = async()=>{
            const semesters = await getSemester()
            if(semesters){
                setSemester(semesters)
                // const semester = await axios.get(`/api/semester`)
                // setSemester(prev=>[{value:semester.data?.semesters?.semesterCode}])
            }
            
            
            const data = await getStaff(user?.email)
            const coursesdata = await axios.get(`/api/courses?search=${department}`)
            const staffData = await axios.get(`/api/departments?search=${department}`)
            const departmentsdata = await axios.get('/api/departments')
    
            setDepartments(departmentsdata?.data?.departments)
            setCourses(prev=>coursesdata.data?.courses?.map((course:any)=>({value:course?.courseCode})))
            setStaffs(prev=>staffData.data?.departments?.staffs?.map((staff:any)=>({name:`${staff?.title} ${staff?.firstName.charAt(0)} ${staff?.lastName}`,id:staff?.id})))
            
            // setDepartment(data?.departments?.departmentCode!!)
        }
        fetch()
        
    },[user,department])
    console.log(staffs,'this is the staff')
    const form = useForm<z.infer<typeof departmentCourseSchema>>({
        defaultValues: {
           departmentCode:'csc',

        },
        resolver:zodResolver(departmentCourseSchema)
    })
    
    const onSubmit =async (values:z.infer<typeof departmentCourseSchema>)=>{
        const departmentCourse = {
            
            departmentCode:values.departmentCode.toLowerCase(),
            courseCode:values.courseCode.toLowerCase(),
            semesterCode:values.semesterCode.toLowerCase(),
            staffId:Number(values.staffId),
            credit:Number(values.credit)
            

        }
        console.log(departmentCourse,'this is department Course')
       try {
            const result = await axios.post('/api/departmentCourses',departmentCourse)
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
    <div className=' border m-8 bg-white rounded-xl '>
         <p className='px-8 py-4 border-b text-xl text-gray-600 font-semibold'>Assign Course To Staff </p>
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} 
    
                className=' p-8 flex flex-col gap-2 rounded-lg' >
                    <FormField
                    control={form.control}
                    name='courseCode'
                    defaultValue=''
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Courses</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}   defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue onClick={(e)=>{console.log(e)}} placeholder="---select course---" />
                                    </SelectTrigger>
                                </FormControl>
                                <DropDown  properties={courses}  />
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    
                    
                    <FormField
                    control={form.control}
                    name='credit'
                    defaultValue=''
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>credit</FormLabel>
                            <FormControl >
                                <Input  className='w-full border-none ring-1 outline-none focus-visible:ring-offset-3 focus-visible:ring-1 ' placeholder='Enter credit' type='number'  {...field}  />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField
                    control={form.control}
                    name='staffId'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Assign Staff</FormLabel>
                            <Popover >
                                <PopoverTrigger asChild>
                                    <FormControl className='w-full'>
                                        <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={true}
                                        className="w-full justify-between"
                                        >
                                        {field.value
                                            ? staffs.find((staff) => staff.id === field.value)?.name.toUpperCase()
                                            : "Select staffs..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                    <CommandInput placeholder="Search staffs..." />
                                    <CommandList>
                                        <CommandEmpty>No Staff found.</CommandEmpty>
                                        <CommandGroup>
                                        {staffs?.map((staff) => (
                                            <CommandItem
                                            key={staff.id}
                                            value={staff.name}
                                            onSelect={(currentValue) => {
                                                form.setValue('staffId', staff.id);
                                            
                                            }}
                                            >
                                            <Check
                                                className={cn(
                                                "mr-2 h-4 w-4",
                                                staff.id === field.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {staff.name.toUpperCase()}
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
                    <FormField
                    control={form.control}
                    name='semesterCode'
                    defaultValue=''
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Semester</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}  defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue onClick={(e)=>{console.log(e)}} placeholder="---select semester---" />
                                    </SelectTrigger>
                                </FormControl>
                                <DropDown properties={semesters}  />
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <Button type='submit' variant={'auth'} className=' w-fit rounded-md mt-6 py-5  bg-sky-600 z-40 text-white text-xl' >Add</Button>
                </form>
           </Form>
    </div>
  )
}

export default DepartmentCourses