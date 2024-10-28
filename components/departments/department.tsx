'use client'
import React, { useEffect, useState } from 'react'
import { courseSchema, departmentSchema, facultySchema } from '../../schemas'
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
import { Check, ChevronsUpDown } from 'lucide-react'

import { facultyProp } from '@/lib/props'



const Department = () => {
    const [faculties,setFaculties] = useState<facultyProp[]>([])
    useEffect(()=>{
        const fetch = async()=>{
            const data = await axios.get('/api/faculty')
            console.log(data.data.faculties)
            setFaculties(data?.data?.faculties)
        }
        fetch()
        
    },[])
    const form = useForm<z.infer<typeof departmentSchema>>({
        defaultValues: {
            departmentCode:"",
            facultyCode:'',
            name:""
        },
        resolver:zodResolver(departmentSchema)
    })
    const router = useRouter()
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')
    const onSubmit =async (values:z.infer<typeof departmentSchema>)=>{
        const department = {
            name:values.name.toLowerCase(),
            code:values.departmentCode.toLowerCase(),
            facultyCode:values.facultyCode.toLowerCase(),

        }
       try {
            const result = await axios.post('/api/departments',department)
            console.log(result)
            if(result.status === 201){
                
                toast.success(`${result.data?.message}`,{
                    theme:'colored'
                })
            }
        
       } catch (error:any) {
        console.log(error)
        toast.error(`${error?.response?.data?.error}`,{
            theme:'colored'
        })
        
       }
       finally{
        form.reset()
       }
    }

  return (
    <div className=' border m-8 bg-white rounded-xl mt-0'>
        <p className='px-8 py-4 border-b text-xl text-gray-600 font-semibold'>Add Department </p>
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} 
    
                className=' p-8 flex flex-col gap-2 rounded-lg' >
                    <FormField
                    control={form.control}
                    name='name'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Department Name</FormLabel>
                            <FormControl >
                                <Input  className='w-full border-none ring-1 outline-none focus-visible:ring-offset-3 focus-visible:ring-1 ' placeholder='introduction to code'  {...field}  />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField 
                    control={form.control}
                    name='departmentCode'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Department Code</FormLabel>
                            <FormControl >
                                <Input className='w-full border-none ring-1 outline-none focus-visible:ring-offset-3 focus-visible:ring-1 ' placeholder=''  {...field}  />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        
                    )}/>
                    <FormField 
                    control={form.control}
                    name='facultyCode'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel className='block my-1'>Faculty</FormLabel>
                            <Popover >
                                <PopoverTrigger asChild>
                                    <FormControl className='w-full'>
                                        <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={true}
                                        className="w-[200px] justify-between"
                                        >
                                        {field.value
                                            ? faculties.find((faculty) => faculty.code === field.value)?.code.toUpperCase()
                                            : "Select faculty..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                    <CommandInput placeholder="Search faculty..." />
                                    <CommandList>
                                        <CommandEmpty>No faculty found.</CommandEmpty>
                                        <CommandGroup>
                                        {faculties.map((faculty) => (
                                            <CommandItem
                                            key={faculty.code}
                                            value={faculty.code}
                                            onSelect={(currentValue) => {
                                                form.setValue('facultyCode', faculty.code);
                                            
                                            }}
                                            >
                                            <Check
                                                className={cn(
                                                "mr-2 h-4 w-4",
                                                faculty.code === field.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {faculty.code.toUpperCase()}
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

export default Department