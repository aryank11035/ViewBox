
import { auth, signIn, signOut } from "@/auth"
import { Session } from "@/schema/type"

import { redirect } from "next/navigation"

export default async function UserPage(){

    const session = (await auth()) as Session | null
  
    if(!session?.user) return redirect('/auth/login')

    return (
        <> 

            <section className="w-full min-h-screen pt-20">
                <div className="max-w-[1700px] min-h-screen mx-auto border-l border-r border-white/10 bg-black/30">
                    <h1 className="pt-20">Hello {session?.user.name}</h1>
                    <button onClick={async() => {
                        'use server'
                        await signOut()
                        console.log('clicked')
                    }}>Sign Out</button>
                </div>
            </section>
        </>
    )
}