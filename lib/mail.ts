
import { EmailTemplate,  EmailTemplate2, EmailTemplate3 } from '@/components/emailTemplate';
import { Resend } from 'resend';
import { db } from './db';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetToken = async (email:string,token:string) => {
    await resend.emails.send({
        from: 'Resulx <onboarding@resend.dev>',
        to: [`${email}`],
        subject: 'Reset Password',
        react: EmailTemplate({ token: token}),
      });
    
}
export const sendVerificationToken = async (email:string,token:string) => {
    await resend.emails.send({
        from: 'Resulx  <onboarding@resend.dev>',
        to: [`${email}`],
        subject: 'Verify Email Address',
        react: EmailTemplate2({ token: token}),
      });
    
}

export const sendResultsToParents = async (student:any,results:any,failedCourses:string[],gpa:any,cgpa:any,semester:any,email:string) => {
   
    await resend.emails.send({
        from: 'Resulx <onboarding@resend.dev>',
        to:[`${email}`],
        subject: "View Semester Result",
        react:EmailTemplate3({student:student,results:results,failedCourses:failedCourses,gpa:gpa,cgpa:cgpa,semester:semester})
    })
}