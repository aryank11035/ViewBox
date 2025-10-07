import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function POST(req: NextRequest) {
    const body = await req.json()


    if(!body.email || !body.password) return NextResponse.json({success : false , error : 'Invalid fields'})

    const { email , password } = body
    
    try {
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password
          })
        
          if (result?.error) {
            return new Response(JSON.stringify({ error: result.error }), {
              status: 401,
              headers: { "Content-Type": "application/json" }
            })
          }
        
          // Login successful → server-side redirect
          redirect(DEFAULT_LOGIN_REDIRECT)
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