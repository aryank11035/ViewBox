'use client'

import { SlFilm } from "react-icons/sl";
import { FaRegStar } from "react-icons/fa";
import { Users } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import {motion} from 'framer-motion'
import { useState } from "react";
import Link from "next/link";




export function InfoCardSection(){

   

    return (
       <div className="max-w-[1450px] mx-auto border-l border-r border-white/10 h-full gap-8 py-8 flex flex-col ">
          <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2  md:gap-8 lg:gap-8 px-8 space-y-8 md:space-y-0  mx-auto">
            <motion.div 
                whileHover={{scale: 1.05 }}
                        transition={{
                            type : "spring",
                            stiffness : 400,
                            damping : 15
                        }}
                className="flex flex-col bg-white/10 gap-3 p-8 text-wrap cursor-pointer rounded-xs" 
            >
                <div ><SlFilm size={45}/></div>
                <h1 className="text-xl font-bold">Communtiy-Curated Exellecne</h1>
                <p className="text-white/40">Every film is voted on by passionate movie enthusiasts, ensuring only the truly exceptional make the cut.</p>
            </motion.div>
            <motion.div 
                whileHover={{scale: 1.05}}
                        transition={{
                            type : "spring",
                            stiffness : 400,
                            damping : 15
                        }}
                className="flex flex-col bg-white/10 gap-3 p-8 text-wrap cursor-pointer rounded-xs" 
            >
                <div ><FaRegStar size={50}/></div>
                <h1 className="text-xl font-bold">Sync & Save Anywhere</h1>
                <p className="text-white/40">Keep track of your discoveries across all your devices. Never lose track of a great find.</p>
            </motion.div>
            <motion.div 
                whileHover={{scale: 1.05}}
                        transition={{
                            type : "spring",
                            stiffness : 400,
                            damping : 15
                        }}
                className="flex flex-col bg-white/10 gap-3 p-8 text-wrap cursor-pointer rounded-xs"
             >
                <div ><Users size={50}/></div>
                <h1 className="text-xl font-bold">Vote & Shape The List</h1>
                <p className="text-white/40">Help maintain the quality by upvoting hidden masterpieces and downvoting films that don't belong.</p>
            </motion.div>
            <motion.div 
                whileHover={{scale: 1.05}}
                        transition={{
                            type : "spring",
                            stiffness : 400,
                            damping : 15
                        }}   
                className="flex flex-col bg-white/10 gap-3 p-8 text-wrap cursor-pointer rounded-xs" 
            >
                <div ><Sparkles size={50}/></div>
                <h1 className="text-xl font-bold">AI Analysis</h1>
                <p className="text-white/40">Get insights into the philosophical and psychological themes of each movie with spoiler or non-spoiler analysis. </p>
            </motion.div>
          </div>
          <div className="  w-full mt-10">
                <div className="w-[80%] mx-auto  h-full flex flex-col items-center justify-center gap-6">
                    <h1 className="text-3xl font-bold text-center">Ready to Discover Movies Worth Your Time?</h1>
                    <p className="text-white/40 text-center">Join the club of film enthusiasts who've already found their next favorite underrated movie.</p>
                    <HomeButton />
                </div>
          </div>
        </div>
    )
}


export const HomeButton = () => {
    const [onHover,setOnHover] = useState(false)
    
    return (
        <Link href='/home'>
            <motion.div 
                className="bg-green-600 w-fit h-fit flex gap-2 items-center p-3 rounded-xs cursor-pointer hover:text-green-600 hover:bg-white duration-300 font-light text-sm active:scale-95 "
                onMouseEnter = {() => setOnHover(true)}
                onMouseLeave = {() => setOnHover(false)}    
            >
                
                <motion.div 
                    className="h-fit w-fit flex items-center justify-center gap-2 "
                >
                    <p >Start Discovering</p> 
                    <motion.div
                        className="size-4 "
                        
                        initial = {{ opacity : 1  }}
                        animate = { onHover ? 'hovered' : 'normal' }
                        variants={{
                            normal : { opacity : 1 ,  translateX : 0 , translateY : -2 },
                            hovered : { opacity : 1 ,  translateX : 3 , translateY : -5},   
                        }}
                        transition={{                                        
                            duration : 0.3,
                            ease: [0, 0.71, 0.2, 1.01],
                        }}
                    >

                        <svg width="100&" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 18L18 6M18 6H10M18 6V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        
                    </motion.div>

                </motion.div>
            </motion.div>
        </Link>
    )
}