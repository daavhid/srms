import React, { useEffect, useState } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { ControllerProps } from 'react-hook-form'
import axios from 'axios'


interface DateProp{
    value:Date,
    onChange:any,
    location?:string,
    selectedSession?:string 
}

interface sessionProp {
    sessionCode?:string ,
    endDate:Date ,
    startDate:Date  
}



const DateComponent = ({value,onChange,location,selectedSession}:DateProp) => {
    const [session,setSession] = useState<sessionProp>()
    useEffect(()=>{
        const fetch = async()=>{
            const data = await axios.get(`/api/session/?code=${selectedSession}`)
            console.log(data.data.session)
            setSession(data?.data?.session)
        }
        fetch()
    },[selectedSession])
    
  return (
    <Popover>
        <PopoverTrigger asChild>
            <FormControl>
            <Button
                variant={"outline"}
                className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !value && "text-muted-foreground"
                )}
            >
                {value ? (
                format(value, "PPP")
                ) : (
                <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
            </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
            <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            
            // disableNavigation
            
            disabled={(date) =>{
                if(!session && location==='semester'){
                    console.log('i am here')
                    return true
                }else{
                    if(session){
                        return date < new Date(session?.startDate) || date>new Date(session?.endDate)
    
                    }else{
                        return date < new Date()
                    }
                }
                

            }
            }
            initialFocus
            captionLayout="dropdown-buttons"
            fromMonth={session && new Date(new Date(session?.startDate as Date).getFullYear() as number, new Date(session?.startDate as Date).getMonth())}  
            toMonth={session && new Date(new Date(session?.endDate as Date).getFullYear() as number, new Date(session?.endDate as Date).getMonth())}
            fromYear={new Date().getFullYear()}
            toYear={new Date().getFullYear()+10}
            fixedWeeks
            classNames={{ root: ' bg-gray-100' ,caption:' flex item-center justify-center w-full py-1',caption_dropdowns:'flex gap-2 text-xs',dropdown_month:'',caption_label:'hidden'}}
            // pagedNavigation = {true}

            />
        </PopoverContent>
    </Popover>
  )
}

export default DateComponent