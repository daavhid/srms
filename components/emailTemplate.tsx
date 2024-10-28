
import * as React from 'react';

interface EmailTemplateProps {

  token:string
}
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
// import Image from 'next/image';
import { mapResult } from '@/lib/resultMap';
import { cn } from '@/lib/utils';


export const EmailTemplate = ({token }: EmailTemplateProps)=>{
    const resetLink = `http://localhost:3000/new-password?token=${token}`
    return(
        <div>
            <h1>Click <a href={`${resetLink}`}>here</a> to reset Password</h1>
        </div>
    )
}

export const EmailTemplate2 = ({token }: EmailTemplateProps)=>{
    const verifyLink = `http://localhost:3000/verification?token=${token}`
    return(
        <div>
            <h1 className='text-xl'>Click <a href={`${verifyLink}`}>here</a> to verify Email Address</h1>
        </div>
    )
}
export const EmailTemplate3 = ({student,gpa,cgpa,semester,results,failedCourses }: {student:any,gpa:any,cgpa:any,semester:any,results:any,failedCourses:string[]})=>{
    // const verifyLink = `http://localhost:3000/verification?token=${token}`
    return(
        <div className='relative bg-gray-100 print:overflow-hidden print:h-screen'>
                <div className='absolute print:block hidden top-52 left-1/2 -translate-x-[50%] opacity-10  '>
                    {/* <Image src={'/lautech.png'} width={400} height={400} alt='logo'/> */}
                </div>
                {/* <div className='print:px-8 print:block hidden'>
                    <Image src={'/lautech.png'} width={80} height={80} alt='logo'/>
                </div> */}
                <div className='w-5/6 uppercase mx-auto print:flex hidden relative z-20  justify-between my-8'>
                        <div>

                            <p className='mb-2'>name :{student?.firstName}{' '} {student?.lastName}</p>
                            <p>matric number : {student?.matric_number}</p>
                        </div>
                        <div>
                            <p className='mb-2'> {semester?.name} semester</p>
                            <p>{semester?.sessionCode} session</p>
                        </div>
                    </div>
                    <h1 className='text-center text-xl underline my-3 print:mt-16 print:block hidden'>Student Result</h1>
                <table border={1} className=' mx-auto relative z-20 '>

                        <tr className='text-center'>
                            <th className="w-[90px] font-medium uppercase text-center text-xs">S/N</th>
                            <th className=" uppercase text-xs">Course Code</th>
                            <th className='  text-sm'>Course Title</th>
                            <th className='w-[90px] uppercase text-center  text-sm'>Unit</th>
                            <th className='w-[90px] uppercase  text-sm'>score</th>
                            <th className='w-[90px] uppercase  text-sm'>grade</th>
                            <th className='w-[90px] uppercase  text-sm'>gradePoint</th>
                        </tr>
                    
                        {results?.map((data:any, index:number) => (
                            <tr className={cn(index%2===1&&'bg-sky-50 ')} key={index}>

                                <td className='text-center'>{index+1}</td>
                                <td className=''>{data?.courseCode?.replace('-',' ')}</td>
                                <td className=''>{data?.courseTitle}</td>
                                <td className='text-center'>{data?.unit}</td>
                                <td className='text-center'>{data?.exam + data?.ca}</td>
                                <td className='text-center'>{mapResult(data?.exam +data?.ca)}</td>
                                <td className='text-center'>{data?.gradePoint}</td>
                                {/* <TableCell className='capitalize'>{data?.exam}</TableCell> */}
                            
                            </tr>
                        ))}
                        {/* <TableRow>
                            <TableCell className="font-medium">INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                        </TableRow> */}
                </table>
                    <table border={1}>
                            <tr>
                                <th className=" font-medium uppercase text-xs"></th>
                                <th className=" uppercase text-xs"></th>
                                <th className=" uppercase text-xs"></th>
                                <th className=" uppercase text-xs"></th>
                                <th className=" uppercase text-xs"></th>
                                <th className=" uppercase text-xs"></th>
                                
                            </tr>
                            <tr>
                                <td colSpan={3} className='text-center uppercase'>{semester?.name} Semester</td>
                                <td colSpan={3} className='text-center uppercase'>Cumulative Semester</td>
                            </tr>
                            <tr className='text-center'>
                                <td>point</td>
                                <td>Unit</td>
                                <td>GPA</td>
                                <td>total Point</td>
                                <td>Total Unit</td>
                                <td>CGPA</td>
                            </tr>
                            <tr className='text-center'>
                                <td>{gpa?.totalGradePoint}</td>
                                <td>{gpa?.totalUnit}</td>
                                <td>{results.length>1&&(gpa?.totalGradePoint/gpa?.totalUnit).toPrecision(3)}</td>
                                <td>{results.length>1&&cgpa?.totalGradePoint}</td>
                                <td>{results.length>1&&cgpa?.totalUnit}</td>
                                <td>{results.length>1&&(cgpa?.totalGradePoint/cgpa?.totalUnit).toPrecision(3)}</td>
                            </tr>
                            <tr>
                                <td>uncleared Courses</td>
                            </tr>
                            <tr>
                                {failedCourses?.map((course,index)=>(
                                    <td key={index}>{course}</td>
                                ))}
                                {/* <TableCell>{results.}</TableCell> */}
                            </tr>
                    </table>
            </div>
    )
}



