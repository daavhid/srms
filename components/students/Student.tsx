'use client'
import React, { useEffect, useState } from 'react'
import { studentSchema } from '../../schemas'
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
import { departmentProp } from '@/lib/props'
import { Check, ChevronsUpDown } from 'lucide-react'

const Student = () => {
    const [departments,setDepartments] = useState<departmentProp[]>([])
    const [value, setValue] = useState("")
    const [open, setOpen] = useState(false)
    useEffect(()=>{
        const fetch = async()=>{
            const data = await axios.get('/api/departments')
            console.log(data.data.departments)
            setDepartments(data?.data?.departments)
        }
        fetch()
        
    },[])
    const form = useForm<z.infer<typeof studentSchema>>({
        defaultValues: {
            firstName:"",
            lastName:"",
            email:'',
            departmentCode:'',
            matric_number:"",
            password:'student1234'
        },
        resolver:zodResolver(studentSchema)
    })
    const router = useRouter()
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')
    const onSubmit =async (values:z.infer<typeof studentSchema>)=>{
        const student = {
            firstName:values.firstName.toLowerCase(),
            lastName:values.lastName.toLowerCase(),
            departmentCode:values.departmentCode.toLowerCase(),
            matric_number:values.matric_number.toLowerCase(),
            email:values.email,
            level:Number(values.level),
            password:values.password

        }
       try {
            const result = await axios.post('/api/students',student)
            console.log(result)
            if(result.status === 201){
                
                toast.success(`${result.data?.message}`)
            }
        
       } catch (error:any) {
        console.log(error)
        toast.error(`${error?.response?.data?.error}`)
        
       }
    }

  return (
    <div className=' border m-8 bg-white mt-0'>
        <p className='px-8 py-4 border-b text-xl text-gray-600 font-semibold'>Add Student </p>
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} 
    
                className=' p-8 flex flex-col gap-2 rounded-lg' >
                    <FormField 
                    control={form.control}
                    name='firstName'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl >
                                <Input className='w-full border-none ring-1 outline-none focus-visible:ring-offset-3 focus-visible:ring-1 '  placeholder='Enter First Name'  {...field}  />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        
                    )}/>
                    <FormField 
                    control={form.control}
                    name='lastName'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl >
                                <Input className='w-full border-none ring-1 outline-none focus-visible:ring-offset-3 focus-visible:ring-1 ' placeholder='Enter Last Name'  {...field}  />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        
                    )}/>
                    <FormField 
                    control={form.control}
                    name='email'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl >
                                <Input  className='w-full border-none ring-1 outline-none focus-visible:ring-offset-3 focus-visible:ring-1 ' type='email' placeholder='Enter Email'  {...field}  />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        
                    )}/>
                    <FormField
                    control={form.control}
                    name='matric_number'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Matric Number</FormLabel>
                            <FormControl >
                                <Input  className='w-full border-none ring-1 outline-none focus-visible:ring-offset-3 focus-visible:ring-1 ' placeholder='Enter Matric Number'  {...field}  />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField
                    control={form.control}
                    name='level'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Level</FormLabel>
                            <FormControl >
                                <Input  className='w-full border-none ring-1 outline-none focus-visible:ring-offset-3 focus-visible:ring-1 ' type='number'  placeholder='Enter Level'  {...field}  />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField
                    control={form.control}
                    name='departmentCode'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel className='block my-1'>Department</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-[200px] justify-between"
                                        >
                                        {field.value
                                            ? departments.find((department) => department.departmentCode === field.value)?.departmentCode.toUpperCase()
                                            : "Select department..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                    <CommandInput placeholder="Search department..." />
                                    <CommandList>
                                        <CommandEmpty>No department found.</CommandEmpty>
                                        <CommandGroup>
                                        {departments.map((department) => (
                                            <CommandItem
                                            key={department.departmentCode}
                                            value={department.departmentCode}
                                            onSelect={(currentValue) => {
                                                form.setValue('departmentCode', department.departmentCode);
                                                setOpen(false)
                                            }}
                                            >
                                            <Check
                                                className={cn(
                                                "mr-2 h-4 w-4",
                                                value === department.departmentCode ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {department.departmentCode.toUpperCase()}
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
                    
                    <Button type='submit' variant={'auth'} className=' w-fit rounded-md mt-6 py-5  bg-sky-600 z-40 text-white text-xl' >Add</Button>
                    

    
                </form>
           </Form>
        
    </div>
  )
}

export default Student