'use client'

import { motion } from "framer-motion"
import { useState } from "react"


export type Icondata = {
    logo_path : string ,
    provider_name : string ,
}


export function WhereToWatchIcons({iconData , mediaName} : {iconData : Icondata , mediaName : string}){

    const [isHover,setIsHover] = useState(false)
    const where_to_watch_name = `www.${iconData.provider_name.replace(/[^a-zA-Z0-9]/g, '')}.com`
    
    

    const where_to_watch_link =  iconData.provider_name.includes('YouTube') ? `www.youtube.com/results?search_query=${mediaName}` : iconData.provider_name.includes('Google Play') ? `play.google.com/store/search?q=${mediaName}&c=movies` : iconData.provider_name.includes('Apple') ? 'tv.apple.com': iconData.provider_name.includes('Amazon') ? 'primevideo.com' : iconData.provider_name.includes('VI movies and tv') ? `moviesandtv.myvi.in` :  where_to_watch_name

    return(
        
        <motion.a 
            href={`https://${where_to_watch_link.toLowerCase()}`}
            target = "_blank"
            className="bg-white/20 w-fit h-fit flex gap-2 items-center p-2 rounded-xs cursor-pointer hover:text-black/80 hover:bg-white duration-300"
            onMouseEnter = {() => setIsHover(true)}
            onMouseLeave = {() => setIsHover(false)}
        >
            <img   src={`https://image.tmdb.org/t/p/w500${iconData.logo_path}`} 
                className="w-9 h-9 object-contain rounded-xs"
                alt={iconData.provider_name}
            />
            <motion.div     
                className="h-fit w-fit flex items-center justify-center gap-2"
                
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
        </motion.a>
    )
}       