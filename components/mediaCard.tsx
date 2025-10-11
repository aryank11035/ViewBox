'use client'

import Link from "next/link"
import { Star } from "lucide-react"
import { Movie } from "@/schema/type"
import { ProgressiveBlur } from "./motion-primitives/progressive-blur";
import { useState } from "react";
import { motion, scale } from "motion/react";
export default function MediaCard({mediaData,} : {mediaData : Movie } ){
  
   const [isHover, setIsHover] = useState(false);

    return(
        <>
            
                <Link href={`/${mediaData.mediaType ? mediaData.mediaType : mediaData.media_type}/${mediaData.id}`}  key={mediaData.id} > 
                    <motion.div 
                        className="relative w-72    aspect-[2/3] cursor-pointer  shadow-xl shadow-black/30 mx-auto"
                        whileHover={{scale: 1.05}}
                        transition={{
                            type : "spring",
                            stiffness : 400,
                            damping : 15
                        }}
                        >
                        {/* <div className="absolute inset-0 rounded-xs border border-white/10 flex items-end">
                            <h1 className="text-xl pl-5 pb-5 font-bold text-white/20">+ Add to Watchlist</h1>
                            </div> */}
                        <div className="group relative w-full h-full rounded-xs overflow-hidden shadow-xs 
                                        bg-[#111111]
                                        duration-300 transform"
                                            onMouseEnter={() => setIsHover(true)}
                                            onMouseLeave={() => setIsHover(false)}
                                        >
                            {
                                mediaData.poster_path ? 

                                    <motion.div
                                        className="absolute inset-0"
                                        animate={isHover ? 'hovered' : 'normal'}
                                        variants={{
                                            normal: { scale: 1, opacity: 1 },
                                            hovered: { scale: 1.05, opacity: 1},
                                        }}
                                        transition={{ duration: 0.2, ease: 'easeOut' }}
                                    >
                                        <img
                                        src={mediaData.poster_path ? `https://image.tmdb.org/t/p/w500${mediaData.poster_path}` : '/placeholder-movie.jpg'}
                                            alt={mediaData.title}
                                            className="absolute inset-0"
                                            />
                                    </motion.div>
                                        :
                                        <div className="absoulte inset-0 w-full h-full  backdrop-blur-lg hover:scale-105 duration-200"></div>
                                    }         
                            <ProgressiveBlur
                                        className='pointer-events-none absolute bottom-0 left-0 h-[50%] w-full'
                                        blurIntensity={0.8}
                                        animate={isHover ? 'visible' : 'hidden'}
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: { opacity: 1 },
                                        }}
                                        transition={{ duration: 0.2, ease: 'easeOut' }}
                                        />  
                            <motion.div
                                className='absolute bottom-0 left-0  w-full'
                                animate={isHover ? 'visible' : 'hidden'}
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1 },
                                }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                                <div className="absolute bottom-0 p-4  space-y-2 w-full ">
                                    <h1 className="text-xl font-bold">{mediaData.title || mediaData.name}</h1>
                                    <div className='flex gap-2  items-center'>
                                        <Star size={20} strokeWidth={1}/>
                                        <h1 className="text-xl font-light">{mediaData.vote_average ? `${mediaData.vote_average.toFixed(1)}/10`  : 'NA'}</h1>
                                    </div>
                                </div>
                                
                            </motion.div>     
                        </div>
                    </motion.div>
                </Link> 
            
        </>
    )
}