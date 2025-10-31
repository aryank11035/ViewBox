'use client'

import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur"
import { Movie } from "@/schema/type"
import { useEffect, useRef, useState } from "react"
import { FaHeart } from "react-icons/fa"
import { AnimatePresence, delay, easeIn, motion } from 'framer-motion'
import { X } from "lucide-react"


const useOutsideClick = (callback : () => void) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = (event : MouseEvent) => {
            if(ref.current && !ref.current.contains(event.target as Node)) {
                callback()
            }
        }
        document.addEventListener('click' , handleClick)

        return  () => {
            document.removeEventListener('click' , handleClick)    
        }
    } , [callback])

    return ref;
}

const containerVariants = {
    hidden : {
        padding : '0',
        transition : {
           duration : 0.2,
        }
    },
    visible : {
        padding : '1rem',
        transition : {
           duration : 0.2,
        }
    }
}

const backgroundVariants = {
    hidden : {
        backdropFilter: 'blur(0px)',
        transition : {
            duration : 0.2,
        }
    },
    visible : {
        backdropFilter: 'blur(5px)',
        transition : {
            duration : 0.2,
        }
    }
}

const closeButtonVariant = {
    hidden : {
        rotate : 90 , 
        transition : {
            duration : 0.2,
        }
    },
    visible : {
        rotate : 0 , 
        transition : {
            duration : 0.2,
            delay : 2,
        }
    }
}


export default function FavCard({media} : {media : Movie}){

    const [current,setCurrent] = useState<Movie | null>(null)
    const ref= useOutsideClick(() => setCurrent(null))

    return(
        
 
        <div className="relative min-h-screen w-full "> 
            <AnimatePresence mode='wait'>

             {
                 current && (
                     <motion.div 
                     initial='hidden'
                     animate='visible'
                     exit='hidden'
                     variants={backgroundVariants} 
                     className="fixed inset-0 z-10 "
                     > 
                    </motion.div>
                )
            } 
             </AnimatePresence>
              <AnimatePresence>
            {
                current && (
                    <div
                        className="fixed inset-0 z-10 flex items-center justify-center px-4"
                    >
                        <motion.div 
                            variants={containerVariants}
                            initial='hidden'
                            animate='visible'
                            exit='hidden'
                            layoutId={`card-${media._id}`}
                            className=" bg-[#111111] z-20 rounded-xs flex  gap-2 md:gap-4 md:w-200  flex-col md:flex-row md:h-[463px] relative overflow-hidden border border-[rgba(255,255,255,0.1)] mt-10 md:mt-0 " ref={ref}>
                            <button onClick={() => setCurrent(null)} className="flex justify-end text-white/50 md:hidden cursor-pointer"><X /></button>
                            <motion.div 
                                layoutId={`card-${media.poster_path}`}
                                className="md:w-72 aspect-[2/3] mx-auto md:mx-0 w-full"
                            >
                                <img src={ `https://image.tmdb.org/t/p/w500${current.poster_path}`} className="w-full h-full rounded-xs"/>
                            </motion.div>
                            <div
                                className="flex flex-col gap-2"
                            >
                                <motion.div
                                    layoutId={`card-${media.title}`}
                                    className="text-3xl tracking-tighter w-full flex justify-between">
                                        <p>
                                            {current.title}   
                                        </p>
                                        <motion.button onClick={() => setCurrent(null)} variants={closeButtonVariant} initial='hidden' animate='visible' exit='hidden' className="md:flex justify-end text-white/50  hidden items-center cursor-pointer"><X /></motion.button>
                                </motion.div>

                                <p className="text-sm text-white/30 font-medium">{current.release_date}</p>

                                <motion.div className='flex gap-2  items-center'>
                                    <img 
                                        src="/logo-imdb.svg" 
                                        alt="IMDb Logo" 
                                        className="w-10  h-auto" 
                                    />
                                    <h1 className="text-xl font-light">{media.vote_average ? `${media.vote_average.toFixed(1)}/10`  : 'NA'}</h1>
                                </motion.div>
                                <div className="flex gap-2">
                                    <motion.div className='bg-white/10 rounded-xs p-4'>
                                        <FaHeart className="text-xl  group-hover:scale-120 duration-200"/>
                                    </motion.div>
                                    <motion.div className="bg-white/10 p-4 rounded-xs h-full text-sm font-light">
                                        Find where to watch
                                    </motion.div>
                                </div>
                                <motion.div className="bg-white/30 rounded-xs text-xs flex-wrap w-fit p-3 font-medium space-y-1.5">
                                {
                                    current.genres.map((genre : any,index : number) => (         
                                        <span key={genre.id}>
                                            {genre.name}
                                            {index < current.genres.length - 1 && ', '}
                                        </span>           
                                    ))
                                }
                                </motion.div>
                                <p className="text-wrap text-sm font-medium text-white/30 overflow-auto pb-20 ">
                                    {media.overview} 
                                </p>
                            </div>
                        </motion.div>
                    </div> 
                )
            }
          </AnimatePresence>
                <div
                    className="w-full min-h-screen grid-cols-5 grid rounded-xs"
                >
                    <motion.button 
                        layoutId={`card-${media._id}`}
                        onClick={() => setCurrent(media)}
                        className="w-60 aspect-[2/3] relative rounded-xs backdrop-blur-2xl cursor-pointer">
        
                        <motion.div 
                            layoutId={`card-${media.poster_path}`}
                            className="absolute inset-0 rounded-xs">
                            <img src={ `https://image.tmdb.org/t/p/w500${media.poster_path}`} className="w-full h-full rounded-xs cursor-pointer"/>
                        </motion.div>
                        <ProgressiveBlur 
                            className="pointer-events-none absolute bottom-0 left-0 h-[40%] w-full rounded-xs "
                            blurIntensity={3}
                        />
                        <div 
                            className="absolute bottom-0 p-4  space-y-2 w-full"
                        >
                            <motion.h1 
                                layoutId={`card-${media.title}`}
                                className="text-xl font-bold text-left">
                                    {media.title}
                            </motion.h1>

                            <motion.div className='flex gap-2 '>
                                <img 
                                    src="/logo-imdb.svg" 
                                    alt="IMDb Logo" 
                                    className="w-10  h-auto" 
                                />
                                <h1 className="text-xl font-light">{media.vote_average ? `${media.vote_average.toFixed(1)}/10`  : 'NA'}</h1>
                            </motion.div>
                        </div>
                    </motion.button>                 
                </div>
        </div>
       

    )
}