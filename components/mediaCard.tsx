'use client'

import Link from "next/link"
import { ProgressiveBlur } from "./motion-primitives/progressive-blur";
import { useState } from "react";
import { motion } from "motion/react";
import { Movie } from "@/schema/type";
export default function MediaCard({mediaData , forHomepage = false } : {mediaData : Movie ,forHomepage ?: boolean } ){
  
    const [isHover, setIsHover] = useState(false);
    const [isActive, setIsActive] = useState(false);

    
    const name = mediaData.title ? mediaData.title : mediaData.name
   
    return( 
        <>  

            
                <Link href={`/${mediaData.mediaType ? mediaData.mediaType : mediaData.media_type}/${mediaData.id}/${name}`}  key={mediaData.id} > 
                    <motion.div 
                        className={`relative ${forHomepage ? 'w-58 800:hidden flex' : 'w-full'}  aspect-[2/3] cursor-pointer mx-auto rounded-xs  `}
                       
                        >
       


                        <div className="group relative w-full h-full rounded-[0.20rem] overflow-hidden shadow-xs 
                                        bg-black 
                                        duration-300 transform"
                                            onMouseEnter={() => setIsHover(true)}
                                            onMouseLeave={() => setIsHover(false)}
                                            onMouseDown={() => setIsActive(true)}
                                            onMouseUp={() => setIsActive(false)}
                                            >
                                    
                            {
                                mediaData.poster_path ? 

                                    <motion.div
                                        className="absolute inset-0 overflow-hidden"
                                        animate= {isActive
                                                ? { scale: 1.17 }     // pressed
                                                : isHover
                                                ? { scale : 1.1 }    // hover
                                                : { scale : 1 }      // normal
                                            }
                                        
                                        transition={{ duration: 0.2, ease: 'easeOut' }}
                                    >


                                                <img
                                                    src={mediaData.poster_path ? `https://image.tmdb.org/t/p/w500${mediaData.poster_path}`: '/placeholder-movie.jpg'}
                                                    alt={mediaData.title}
                                                    className="w-full h-full"
                                                    />
                                          

                                    </motion.div>
                                        :
                                        <div className="absoulte inset-0 w-full h-full  backdrop-blur-lg hover:scale-105 duration-200"></div>
                                    }         

                                    <motion.div
                                        className="absolute inset-0 bg-black/40 pointer-events-none"
                                        animate={
                                            isActive
                                                ? { opacity: 1 }     // pressed
                                                : isHover
                                                ? { opacity: 1 }    // hover
                                                : { opacity: 0 }      // normal
                                            }
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                    />


                            <ProgressiveBlur
                                        className='pointer-events-none absolute bottom-0 left-0 h-[50%] w-full'
                                        blurIntensity={0.8}
                                        animate={ 'visible' }
                                        variants={{
                                            visible: { opacity: 1 },
                                        }}
                                        transition={{ duration: 0.2, ease: 'easeOut' }}
                                        />  
                            <motion.div
                                className='absolute bottom-0 left-0  w-full'
                                animate={ 'visible' }
                                variants={{
            
                                    visible: { opacity: 1 },
                                }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                               
                                    <div className="absolute bottom-0 p-4  space-y-2 w-full ">
                                        <h1 className="text-xl font-bold">{mediaData.title || mediaData.name}</h1>
                                        <div className='flex gap-2  items-center'>
                                            <img 
                                                src="/logo-imdb.svg" 
                                                alt="IMDb Logo" 
                                                className="w-10  h-auto" 
                                            />
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