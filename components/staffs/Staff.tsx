'use client'
import React, { useEffect, useState } from 'react'
import { staffSchema } from '../../schemas'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const titles = [
    'Dr','Prof','Mr','Mrs'
]

const Staff = () => {
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
    const form = useForm<z.infer<typeof staffSchema>>({
        defaultValues: {
            firstName:"",
            lastName:"",
            email:'',
            departmentCode:'',
            password:"staff1234",
        },
        resolver:zodResolver(staffSchema)
    })
    const router = useRouter()
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')
    const onSubmit =async (values:z.infer<typeof staffSchema>)=>{
        const staff = {
            firstName:values.firstName.toLowerCase(),
            lastName:values.lastName.toLowerCase(),
            departmentCode:values.departmentCode.toLowerCase(),
            email:values.email,
            password:values.password,
            title:values.title.toLowerCase(),

        }
       try {
            const result = await axios.post('/api/staffs',staff)
            console.log(result)
            if(result.status === 201){
                
                toast.success(`${result.data?.message}`,{
                    theme:'colored',
                    position:'bottom-right'
                })
            }
        
       } catch (error:any) {
        console.log(error)
        toast.error(`${error?.response?.data?.error}`,{
            theme:'colored'
        })
        
       }
    }

  return (
    <div className=' border m-8 mt-0 bg-white rounded-xl '>
        <p className='px-8 py-4 border-b text-xl text-gray-600 font-semibold'>Add Staff </p>
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} 
    
                className=' p-8 flex flex-col gap-2 rounded-lg' >
                    <FormField 
                    control={form.control}
                    name='title'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <Select onValueChange={field.onChange}  defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className='w-full border-none ring-1 outline-none focus-visible:ring-offset-3 focus-visible:ring-1'>
                                        <SelectValue className='border-none ring-0 outline-none focus:ring-0 focus-visible:ring-offset-3 focus-visible:ring-1' onClick={(e)=>{console.log(e)}} placeholder="---choose Title---" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent >
                                    {titles.map(title => (
                                        <div >
                                            <SelectItem    value={title}>{title}</SelectItem>
                                        </div>
                                    ))}
                                   
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                        
                    )}/>
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

export default Staff