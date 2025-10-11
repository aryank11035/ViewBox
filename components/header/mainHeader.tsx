'use client'
import Link from "next/link";
import { Search,CircleUser } from "lucide-react";
import { useEffect, useState } from "react";

import { Session } from "@/schema/type";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export  function Header({session} : {session : Session | null}){
    const [headerName,setHeaderName] = useState<string | undefined>(session?.user?.name)
    const router = useRouter()
    
    useEffect(() => {
      setHeaderName(session?.user?.name)
    },[headerName])
    
    return (
        <header className="w-full h-20  flex items-center justify-center text-white fixed z-20 border-b border-b-white/10  backdrop-blur-xl">
        
          <nav className="w-[1700px] h-full border-l border-r border-white/10 flex justify-between items-center px-6 md:px-10 backdrop-blur-xl">
            <Link href='/'>
              <h1 className="text-2xl lg:text-4xl font-bold cursor-pointer tracking-wider">ViewBox</h1>
            </Link>
            <div className="flex  gap-5 md:gap-10 items-center justify-center">
              {
                session ? (
                  <p className="text-xl hidden md:flex">{headerName && `Hello! ${headerName.split('')[0].toUpperCase()}${headerName.slice(1)}` }</p>
                ) : (
                  <Button onClick={() => {router.push('/auth/register')}} className="bg-green-600 rounded-xs hover:bg-green-200  hover:text-green-600 shadow-xs shadow-black/50 cursor-pointer hover:scale-95  duration-200 " >
                    <p>Sign In</p>
                  </Button>
                )
              }
              <div className="flex gap-10 text-xl font-bold justify-center items-center ">
                  <Link href='/search'><Search strokeWidth={1} size={32}/></Link>
                  <Link href="/user" className="hidden md:block">
                    <CircleUser strokeWidth={1} size={32}/>
                  </Link> 
              </div>
            </div>
          </nav>  
      </header>
    )
}   