'use client'
import Link from "next/link";
import { Search,CircleUser } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence , motion } from "motion/react";
import { ListVideo } from 'lucide-react';
import { useRouter } from "next/navigation";
import LinkPopUp from "./link-popup";
import HeaderSearchBar from "./search-bar";
import HeaderSideBar from "./side-bar";


export  function Header({session} : {session : any | null}){

    const [showLinkContainers , setShowLinkContainers] = useState<boolean>(false)

    const [headerName,setHeaderName] = useState<string | undefined>(session?.user?.name)
    const router = useRouter()
    
    useEffect(() => {
      setHeaderName(session?.user?.name)
    },[headerName])
    
    

 

    return (
        <header className="w-full h-20  flex  justify-center text-white fixed z-20 border-b border-b-white/10  backdrop-blur-xl top-0  mx-auto">
        
          <nav className= "h-full border-l border-r border-white/10 flex justify-between items-center px-6  md:px-10 backdrop-blur-xl z-20 w-full mx-auto  max-w-[1450px] ">
            <Link href='/' prefetch={true}>
              <h1 className="text-2xl lg:text-3xl font-bold cursor-pointer tracking-wider">ViewBox</h1>
            </Link>

            {/* large screen navbar */}
            <div className="  gap-5  items-center justify-center hidden 760:flex">
              <Link href='/home'>
                <div className=" gap-2 items-center justify-center hover:text-green-600 duration-200 cursor-pointer flex ">
                  <ListVideo strokeWidth={1} size={20} /><p className="mb-0.5">Home</p> 
                </div>
              </Link>
              <div className=" relative w-[300px] items-center flex  h-10 ">
                  <HeaderSearchBar/>
              </div>
              <div className="flex gap-10 font-bold justify-center items-center ">
                  
                  
                      <div
                        className="cursor-pointer"
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

            <HeaderSideBar />
          </nav>  
      </header>
    )
}   