'use client'

import { motion } from "framer-motion"
import { useState } from "react"

export function WhereToWatchIcons({iconData} : {iconData : any}){

    const [isHover,setIsHover] = useState(false)

    return(
        
        <a className="bg-white/20 w-fit h-fit flex gap-2 items-center p-2 rounded-xs cursor-pointer ">
            <img   src={`https://image.tmdb.org/t/p/w500${iconData.logo_path}`} 
                className="w-9 h-9 object-contain rounded-xs"
            />
            <motion.div 
                className="h-fit w-fit flex items-center justify-center gap-2"
                onMouseEnter = {() => setIsHover(true)}
                onMouseLeave = {() => setIsHover(false)}
            >
                <p >{iconData.provider_name}</p> 
                <motion.div
                    className="size-4 "
                    
                    initial = {{ opacity : 1  }}
                    animate = { isHover ? 'hovered' : 'normal' }
                    variants={{
                        normal : { opacity : 1 ,  translateX : 0 , translateY : -2 },
                        hovered : { opacity : 1 ,  translateX : 3 , translateY : -5},
                    }}
                >

                    <svg width="100&" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 18L18 6M18 6H10M18 6V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    
                </motion.div>

            </motion.div>
        </a>
    )
}   