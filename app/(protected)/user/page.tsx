
import { auth, signIn, signOut } from "@/auth"
import { Session } from "@/schema/type"

import { redirect } from "next/navigation"

export default async function UserPage(){

    const session = (await auth()) as Session | null
  
    if(!session?.user) return redirect('/auth/login')

    return (
        <> 
            <h1 className="pt-20">Hello {session?.user.name}</h1>
            <button onClick={async() => {
                'use server'
                await signOut()
                console.log('clicked')
            }}>Sign Out</button>
        </>
    )
}