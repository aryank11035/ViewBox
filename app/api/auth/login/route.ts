import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";

export async function POST(req: NextRequest) {
    const body = await req.json()


    if(!body.email || !body.password) return NextResponse.json({success : false , error : 'Invalid fields'})

    const { email , password } = body
    
    try {
        const result = await signIn('credentials' , {
            email,
            password,
            redirect : false
        })
       
        if (result?.error) {
            return NextResponse.json({success: false, error: 'Invalid credentials'}, {status: 401})
        }
        return NextResponse.json({success: true , message : 'User Logged In!'}, {status: 200})
    } catch (error) {
        if(error instanceof AuthError) {
            switch(error.type) {
                case "CredentialsSignin" : 
                return  NextResponse.json({error : 'Invalid cerdentials'})
                default : 
                return  NextResponse.json({error : 'Something went wrong'})
            }
        }
        
        throw error;
    }
   
}