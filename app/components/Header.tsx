'use client'
import Link from "next/link";
import { Search,CircleUser } from "lucide-react";
export  function Header({username} : {username : String}){

     
    
    return (
        <header className="w-full h-20  flex items-center justify-center text-white fixed z-20 border-b border-b-white/10  backdrop-blur-xl">
        
        <nav className="w-[1800px] h-full border-l border-r border-white/10 flex justify-between items-center px-6 md:px-10 backdrop-blur-xl">
          <Link href='/'>
            <h1 className="text-2xl lg:text-4xl font-bold cursor-pointer">ViewBox</h1>
          </Link>
          <div className="flex  gap-10 items-center justify-center">
            <p className="text-xl hidden md:flex">{username && `Hello! ${username.split('')[0].toUpperCase()}${username.slice(1)}` }</p>
            <div className="flex gap-10 text-xl font-bold justify-center items-center ">
                <Link href='/search'><Search strokeWidth={1} size={32}/></Link>
                <CircleUser strokeWidth={1} size={32}/>
            </div>
          </div>
        </nav>
      </header>
    )
}   