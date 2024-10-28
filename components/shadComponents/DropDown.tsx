'use client'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import React from 'react'
import { FormControl } from "../ui/form"
import { ScrollArea } from "../ui/scroll-area"



const DropDown = ({properties}:{properties:any[]}) => {
    
  
  return (
            <SelectContent onCloseAutoFocus={(e)=>e.preventDefault()}>
                <ScrollArea className="h-24">   
                    {properties?.map((property,index) => (

                    <SelectItem className="uppercase"  key={index} value={property?.value||property?.semesterCode}>{property?.value?.replaceAll('-',' ').toUpperCase()|| property?.semesterCode?.replaceAll('-',' ')}</SelectItem>
                    ))}
                </ScrollArea>
            </SelectContent>
  )
}

export default DropDown