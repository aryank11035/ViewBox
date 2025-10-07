
import { auth, signIn, signOut } from "@/auth"

export default async function UserPage(){

    const session = await auth()
  
    if(!session?.user) return <h1>Not allowed</h1>

    return (
        <>
        
        
        <h1 className="pt-20">Hello {session.user.name}</h1>
        <button onClick={async() => {
            'use server'
            await signOut()
            
        }}>Sign Out</button>
        
        </>
    )
}