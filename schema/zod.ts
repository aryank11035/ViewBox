import * as z from "zod" ;

export const LoginSchema = z.object({
    email : z.string().email({
        message : 'email is required'
    }),
    password : z.string()
})


export const RegisterSchema = z.object({
    email : z.string().email({
        message : 'email is required'
    }),
    password : z.string().min(6,{
        message : "Minimum 6 characters required"
    }),
    name : z.string().min(1 ,{
        message: "Name is required"
    })
})



 
export const signInSchema = z.object({
  email: z.string({ error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string({ error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})