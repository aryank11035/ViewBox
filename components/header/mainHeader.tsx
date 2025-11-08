'use client'
import Link from "next/link";
import { Search,CircleUser } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence , motion } from "motion/react";
import { ListVideo } from 'lucide-react';

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import LinkPopUp from "./link-popup";
import { Input } from "../ui/input";

export  function Header({session} : {session : any | null}){

    const [showLinkContainers , setShowLinkContainers] = useState<boolean>(false)

    const [headerName,setHeaderName] = useState<string | undefined>(session?.user?.name)
    const router = useRouter()
    
    useEffect(() => {
      setHeaderName(session?.user?.name)
    },[headerName])
    
    

 

    return (
        <header className="w-full h-20  flex items-center justify-center text-white fixed z-20 border-b border-b-white/10  backdrop-blur-xl top-0 ">
        
          <nav className="w-[1450px] h-full border-l border-r border-white/10 flex justify-between items-center px-6 md:px-10 backdrop-blur-xl z-20 ">
            <Link href='/' prefetch={true}>
              <h1 className="text-2xl lg:text-3xl font-bold cursor-pointer tracking-wider">ViewBox</h1>
            </Link>
            <div className="flex  gap-5 md:gap-10 items-center justify-center relative ">
              <Link href='/home'>
                <div className="flex gap-2 items-center justify-center hover:text-green-600 duration-200 cursor-pointer">
                  <ListVideo strokeWidth={1} size={20} /><p className="mb-0.5">Home</p> 
                </div>
              </Link>
              <div className=" relative w-[300px] flex items-center  h-10">
                <div className="px-2 w-fit ">
                  <Search strokeWidth={0.7} size={24}/>
                </div>
                  
                  <Input className="absolute inset-0 h-full border border-[rgba(255,255,255,0.2)] rounded-xs outline-0 pl-10" placeholder="Search Movies...(Ctrl+k)"/>
              </div>
              {/* {
                session ? (
                  <p className=" hidden md:flex">{headerName && `Hello! ${headerName.split('')[0].toUpperCase()}${headerName.slice(1)}` }</p>
                ) : (
                  <Button onClick={() => {router.push('/auth/register')}} className="bg-green-600 rounded-xs hover:bg-green-200  hover:text-green-600 shadow-xs shadow-black/50 cursor-pointer hover:scale-95  duration-200 " >
                    <p>Sign In</p>
                  </Button>
                )
              } */}
              <div className="flex gap-10 font-bold justify-center items-center  ">
                  
                  
                      <div
                        className=" hidden 760:block cursor-pointer"
                        onClick={() => setShowLinkContainers(prev => !prev)}
                      
                      >
                        <CircleUser strokeWidth={1} size={24}/>
                      </div>
                  <AnimatePresence mode="wait" propagate> 
                      {
                        showLinkContainers && (
                          <LinkPopUp setShowLinkContainers={setShowLinkContainers} />
                        )
                      }

                  </AnimatePresence>
              </div>
            </div>
          </nav>  
      </header>
    )
}   