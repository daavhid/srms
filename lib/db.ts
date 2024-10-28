import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;


// <FormField
// control={form.control}
// name='courseCode'
// render={({field})=>(
//     <FormItem>
//         <FormLabel>Courses</FormLabel>
//         <DropDown properties={courses} onChange={field.onChange} value={field.value} />
//         <FormMessage/>
//     </FormItem>
// )}/>
// <FormField 
// control={form.control}
// name='departmentCode'
// defaultValue='department'
// render={({field})=>(
//     <FormItem>
//     <FormLabel>Assign Department</FormLabel>
//     <Select onValueChange={field.onChange}  defaultValue={field.value}>
//             <FormControl>
//                 <SelectTrigger>
//                     <SelectValue onClick={(e)=>{console.log(e)}} placeholder="----choose semester----" />
//                 </SelectTrigger>
//             </FormControl>
//             <SelectContent >
//                 {levels.map(semester => (
//                     <div >
//                         <SelectItem   value={semester.value}>{semester.name}</SelectItem>
//                     </div>
//                 ))}
               
//             </SelectContent>
//         </Select>
    
   
// </FormItem>
    
// )}/>
// <FormField
// control={form.control}
// name='credit'
// render={({field})=>(
//     <FormItem>
//         <FormLabel>credit</FormLabel>
//         <FormControl >
//             <Input  className='w-full border-none ring-1 outline-none focus-visible:ring-offset-3 focus-visible:ring-1 ' placeholder='Enter credit' type='number'  {...field}  />
//         </FormControl>
//         <FormMessage/>
//     </FormItem>
// )}/>
// <FormField
// control={form.control}
// name='level'
// render={({field})=>(
//     <FormItem>
//         <FormLabel>level</FormLabel>
//         <Select
//             onValueChange={field.onChange}
        
//             defaultValue={`${field.value}`}>
//             <FormControl >

//                 <SelectTrigger className="">
//                     <SelectValue placeholder='select department' className="bg-black text-white"/>
//                 </SelectTrigger>
//             </FormControl>
//                 <SelectContent>
//                     {levels?.map((property,index) => (

//                     <SelectItem  key={index} value={property?.value}>{property?.value?.toUpperCase()}</SelectItem>
//                     ))}
//             </SelectContent>
//         </Select>
//         {/* <DropDown properties={levels} onChange={field.onChange} value={field.value} /> */}
//         <FormMessage/>
//     </FormItem>
// )}/>
// {/* <FormField
// control={form.control}
// name='semesterCode'
// render={({field})=>(
//     <FormItem>
//         <FormLabel>Semester</FormLabel>
//         <DropDown properties={semesters} onChange={field.onChange} value={field.value} />
//         <FormMessage/>
//     </FormItem>
// )}/> */}
// <FormField
// control={form.control}
// name='staffId'
// render={({field})=>(
//     <FormItem>
//         <FormLabel>Assign Staff</FormLabel>
//         <Popover >
//             <PopoverTrigger asChild>
//                 <FormControl className='w-full'>
//                     <Button
//                     variant="outline"
//                     role="combobox"
//                     aria-expanded={true}
//                     className="w-full justify-between"
//                     >
//                     {field.value
//                         ? staffs.find((staff) => staff.id === field.value)?.name.toUpperCase()
//                         : "Select staffs..."}
//                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                     </Button>
//                 </FormControl>
//             </PopoverTrigger>
//             <PopoverContent className="w-full p-0">
//                 <Command>
//                 <CommandInput placeholder="Search staffs..." />
//                 <CommandList>
//                     <CommandEmpty>No Staff found.</CommandEmpty>
//                     <CommandGroup>
//                     {staffs?.map((staff) => (
//                         <CommandItem
//                         key={staff.id}
//                         value={staff.name}
//                         onSelect={(currentValue) => {
//                             form.setValue('staffId', staff.id);
                        
//                         }}
//                         >
//                         <Check
//                             className={cn(
//                             "mr-2 h-4 w-4",
//                             staff.id === field.value ? "opacity-100" : "opacity-0"
//                             )}
//                         />
//                         {staff.name.toUpperCase()}
//                         </CommandItem>
//                     ))}
//                     </CommandGroup>
//                 </CommandList>
//                 </Command>
//             </PopoverContent>
//             </Popover>
//         <FormMessage/>
//     </FormItem>
// )}/>

// <Button type='submit' variant={'auth'} className=' w-fit rounded-md mt-6 py-5  bg-sky-600 z-40 text-white text-xl' >Add</Button>
