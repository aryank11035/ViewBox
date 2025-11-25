'use client' 
import { motion , AnimatePresence} from "framer-motion"
import { X } from "lucide-react"
import React, { useState } from "react"

export default function PopUpWrapper({children , items_center =false } : { children : React.ReactNode , items_center : boolean}){

   
    return(

       
            <motion.div 
            
                className={`absolute inset-0 flex justify-center px-2 z-50   ${items_center ? 'items-center' : ''} `}
            > 
                <motion.div 
                    initial={{scale : 0.9 , opacity : 0 , filter : 'blur(10px)'  , rotateX : 15 , rotateY : -20 ,  translateZ: 20}}
                    animate={{scale : 1 , opacity : 1 , filter : 'blur(0px)', rotateX: 0 , rotateY: 0 , translateZ:0}}
                    exit={{scale : 0.9 , opacity : 0 , filter : 'blur(10px)',  rotateX : 15 , rotateY : -20 ,  translateZ: 20}}
                    transition={{
                        duration: 0.4,
                        ease: 'easeInOut'
                    }}
                    className="p-6 bg-[#111111]/70 backdrop-blur-3xl flex flex-col gap-6 rounded-xs  w-[520px] shadow-2xl h-fit mt-30 z-20 "
                >

                    {children}
                </motion.div>
            </motion.div>
    )
}