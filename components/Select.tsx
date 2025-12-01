'use client'

import {  motion } from "framer-motion"
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from "react";
export function Select({ onSelectChange }: { onSelectChange : (mediaType : string) => void  }){

    const [onClick , setOnClick] = useState(false)
    const [mediaType,setMediaType] = useState<'movie' | 'tv' >('movie')

    
    useEffect(() => {
        if(mediaType){
            onSelectChange(mediaType)
        }
    },[mediaType,onSelectChange])
    
    const selecteMediaType = () => {
        if(mediaType === 'tv'){
          
             return 'Show'
        }
        else if(mediaType === 'movie') {
          
            return 'Movie'
        }
        else{ 
            return 'select media type'
        }
    }


    return (
        // this the parent div
        <motion.div 
            initial={{height : 50}}
            onClick={() =>  setOnClick(prev => !prev)}
            animate={onClick ? 'clicked' : 'normal'}
            variants={{
                clicked : {height : 50},
                normal : {height : 150}
            }}
            className="w-full max-w-[200px] h-12 border border-[rgba(255,255,255,0.2)] rounded-xs absolute cursor-pointer bg-[#1e1e1e] flex justify-center z-10"
        >

            <div className=" flex items-center  w-full max-w-[190px] bg-[#1e1e1e] z-100 mx-auto h-12" >
                <div className="w-[90%]  flex items-center justify-center text-white/50 z-100 bg-transparent">
                   {selecteMediaType()}
                </div>
                <div className="h-12 w-fit flex  items-center z-100">
                    <motion.div
                        initial={{rotate : 0}}
                        animate={onClick ? 'clicked' : 'normal'}
                        variants={{
                            clicked : {rotate : 180},
                            normal : {rotate : 0}
                        }}
                        transition={{
                            ease: [0, 0.71, 0.2, 1.01],
                        }}
                        className="h-fit flex items-center w-fit bg-transparent "
                    >
                        <div>
                            <ChevronDown strokeWidth={1} className="text-white/50"/>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* below are the options as div */}
            <motion.div
            initial={{ translateY: 0 }}
            onClick={() =>  {
                setOnClick(false)
                setMediaType('movie')
            }}
            animate={onClick ? "clicked" : "normal"}
            variants={{
                clicked: { translateY: 0 },
                normal: { translateY: 45 },
            }}
            transition={{
                ease: [0, 0.71, 0.2, 1.01],
            }}
            className="absolute w-full max-w-[190px] h-12 bg-[#1e1e1e] top-0 z-10 hover:bg-black flex items-center justify-center "
            >
                Movie
            </motion.div>
            <motion.div
            initial={{ translateY: 0 }}
            onClick={() => { 
                setOnClick(false)
                setMediaType('tv')
            }}
            animate={onClick ? "clicked" : "normal"}
            variants={{
                clicked: { translateY: 0 },
                normal: { translateY: 92 },
            }}
            transition={{

                ease: [0, 0.71, 0.2, 1.01],
            }}
            className="absolute w-full max-w-[190px] h-12 bg-[#1e1e1e] top-0 z-10 hover:bg-black flex items-center justify-center"
            >
                Show
            </motion.div>

            <div className="absolute w-full h-12 top-0  z-40"></div>
        </motion.div>
    )
}