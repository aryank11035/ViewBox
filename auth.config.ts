import { NextConfig } from "next"
import Credentials from "next-auth/providers/credentials"
import { getUserByEmail } from "./data/user"
import { LoginSchema } from "./schema/zod"
import { ZodError } from "zod"
import bcrypt from "bcryptjs"

export default {
    providers: [
        Credentials({
    
          credentials : {
            email: {
              label: "Email",
              type: "text",
              
            },
            password: {
              label: "Password",
              type: "password",
            },
          },
           authorize : async (credentials) : Promise<any | null>=> {
            try{
              const { email , password} = await LoginSchema.parseAsync(credentials)
              
              const user =  await getUserByEmail(email)
    
              if(!user || !user.password) return null
    
              const passwordsMatch = await bcrypt.compare(
                password,
                user.password
              )
    
              if(passwordsMatch) return {...user,id:user._id.toString()}
    
              return null
            }catch(error){
              if (error instanceof ZodError) {
                
                return null
              }
            }
          }
    
        })
      ],
} satisfies NextConfig