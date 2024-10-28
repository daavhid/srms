import * as z from "zod";

export const signInSchema = z.object({
    email:z.string().min(3,{
        message:"email is required"
    }).email('invalid email address'),
    password:z.string().min(6,{
        message:"password must be at least 6 characters"
    })
})
export const newPasswordSchema = z.object({
    password:z.string().min(6,{
        message:"password must be at least 6 characters"
    })
})
export const ResetSchema = z.object({
    email:z.string().min(3,{
        message:"email is required"
    }).email('invalid email address')
})

export const registerSchema = z.object({
    username : z.string().min(1,{
        message:'username is required'
    }),
    email:z.string().min(3,{
        message:"email is required"
    }).email('invalid email address'),
    password:z.string().min(6,{
        message:"password must be at least 6 characters"
    }),
    key:z.string().min(6,{
        message:'secret key must be at least 6 characters'
    })
})

export const courseSchema = z.object({
    department: z.string().min(3,{
        message:"course code is required"
    }).max(6,{message:'Course code too long'}),
    code: z.string().min(1,{
        message:"this field is required"
    }),
    title:z.string().min(6,{
        message:'Course title is required '
    })
})
export const departmentCourseSchema = z.object({
    courseCode: z.string().min(3,{
        message:"required"
    }).max(8,{message:'Course code too long'}),
    semesterCode: z.string().min(1,{
        message:"required"
    }),
    departmentCode:z.string().min(1,{
        message:'required '
    }),
    
    credit:z.string().min(1),
    staffId:z.number()
})
export const facultySchema = z.object({
    code: z.string().min(1,{
        message:"this field is required"
    }),
    name:z.string().min(3,{
        message:'this field is required '
    })
})
export const departmentSchema = z.object({
    departmentCode: z.string().min(1,{
        message:"this field is required"
    }),
    
    facultyCode: z.string().min(1,{
        message:"this field is required"
    }),

    name:z.string().min(3,{
        message:'this field is required '
    })
})

export const staffSchema = z.object({
    firstName: z.string().min(1,{
        message:"this field is required"
    }),
    title: z.string().min(1,{
        message:"this field is required"
    }),
    
    lastName: z.string().min(1,{
        message:"this field is required"
    }),

    email:z.string().min(3,{
        message:"email is required"
    }).email('invalid email address'),
    password:z.string().min(6,{
        message:"password must be at least 4 characters"
    }),
    departmentCode: z.string().min(1,{
        message:"this field is required"
    }),
})

export const studentSchema = z.object({
    firstName: z.string().min(1,{
        message:"this field is required"
    }),
    
    lastName: z.string().min(1,{
        message:"this field is required"
    }),

    matric_number:z.string().min(3,{
        message:'this field is required '
    }),
    level:z.string().min(1),
    email:z.string().min(3,{
        message:"email is required"
    }).email('invalid email address'),
    password:z.string().min(6,{
        message:"password must be at least 4 characters"
    }),
    departmentCode: z.string().min(1,{
        message:"this field is required"
    }),
})

export const sessionSchema = z.object({
    startDate: z.date({message:'date is required'}),
    endDate: z.date({message:'date is required'}),
    
})
export const semesterSchema = z.object({
    startDate: z.date({message:'date is required'}),
    endDate: z.date({message:'date is required'}),
    name:z.string().min(3,{
        message:'this field is required '
    }),
    sessionCode:z.string().min(1,{message:'this field is required'})
})

export const resultSchema = z.object({
    courseCode: z.string().min(3,{
        message:"required"
    }),
    semesterCode: z.string().min(1,{
        message:"required"
    }),
    matric_number:z.string().min(1),
    ca:z.string().min(1),
    exam:z.string().min(1)
})
