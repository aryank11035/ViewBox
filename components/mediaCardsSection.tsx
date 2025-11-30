'use client'
import { Star, X } from "lucide-react"
import { ProgressiveBlur } from "./motion-primitives/progressive-blur"
import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import MediaCard from "./mediaCard";
import { motion } from "framer-motion"
import { Movie } from "@/schema/type";
import PopupWrapper from "./popup-wrapper";
import { closeButtonVariant, mediaSectionVariants } from "./media/playlist/playlist-card/animation-variants";
import { WhereToWatchButton } from "./media/favourite/fav-card";

export function SliderMediaCardSection({mediaData, enable}: {mediaData: any, enable: boolean}) {
    const dataFilter = mediaData.map((media: any) => ( 
        <div key={media.id}>
            <HomePageMediaCard mediaData={media} enable={enable}/>
        </div>
    ))
    return dataFilter
}

const containerVariants = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.25,
            staggerChildren: 0.05,
            staggerDirection: -1,
            ease: [0.4, 0, 0.2, 1],
            when: 'afterChildren'
        }
    }, 
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
            staggerChildren: 0.08,
            delayChildren: 0.1,
            when: "beforeChildren",
            ease: [0.4, 0, 0.2, 1] 
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.25,
            staggerChildren: 0.05,
            staggerDirection: -1,
            when: 'afterChildren',
            ease: [0.4, 0, 0.2, 1] 
        }
    }
} as any

const leftSectionVariants = {
    hidden: {
        x: '120%',
        opacity: 0,
        transition: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1] 
        }
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] 
        }
    },
    exit : {
        x: '120%',
        opacity: 0,
        transition: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1] 
        }
    }
} as any

const rightSectionVariants = {
    hidden: {
        x: '-120%',
        opacity: 0,
        transition: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1] 
        }
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] 
        }
    },
    exit: {
        x: '-120%',
        opacity: 0,
        transition: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1] 
        }
    },
} as any

const centerImageVariants = {
    hidden: {
        scale: 0.85,
        opacity: 0
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
        }
    },
    exit: {
        scale: 0.85,
        opacity: 0,
        transition: {
            duration: 0.3,
            delay : 0.5,
            ease: [0.4, 0, 0.2, 1]
        }
    }
} as any

const infoCardVariants = {
    hidden: {
        x: 20,
        opacity: 0
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
        }
    },
    exit: {
        x: 20,
        opacity: 0,
        transition: { duration: 0.25 }
    }
} as any

export function HomePageMediaCard({mediaData, enable}: {mediaData: any, enable: boolean}) {
    const [isHover, setIsHover] = useState(false);
    const [current, setCurrent] = useState<Movie | null>(null)
    const name = mediaData.title ? mediaData.title : mediaData.name
    return( 
        <>  
            <PopupWrapper isOpen={!!current} onClose={() => setCurrent(null)}>
                {current && (
                    <motion.div 
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        variants={containerVariants}
                        className="relative w-fit h-fit flex">

                        <motion.div 
                            variants={centerImageVariants}
                            className="w-80 aspect-auto bg-[#111111] rounded-xs border border-[rgba(255,255,255,0.1)] p-2 z-300">
                            <img
                                src={
                                    current.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${current.poster_path}`
                                        : "/placeholder-movie.jpg"
                                }
                                alt={mediaData.title}
                                className="w-full h-full rounded-xs"
                            />
                        </motion.div>

                        <motion.div 
                            variants={leftSectionVariants}
                            className="w-40 absolute right-79.5 py-2 -z-20 flex flex-col items-end justify-between h-fit gap-6 pointer-events-none">
                            <motion.div 
                                variants={infoCardVariants}
                                className="p-2 -z-10 bg-black rounded-xs border-l border-t border-b border-[rgba(255,255,255,0.1)] w-fit h-fit flex justify-end">
                                <h1 className="text-xl font-bold text-right w-fit text-wrap">{mediaData.title || mediaData.name}</h1>
                            </motion.div>
                            <motion.div 
                                variants={infoCardVariants}
                                className="p-2 -z-10 bg-black rounded-xs border-l border-t border-b border-[rgba(255,255,255,0.1)] w-fit h-fit flex justify-end text-neutral-500 font-medium">
                                <div className='flex gap-2 items-center flex-col'>
                                    <img 
                                        src="/logo-imdb.svg" 
                                        alt="IMDb Logo" 
                                        className="w-15 h-auto" 
                                    />
                                    <h1 className="text-sm">{current.vote_average ? `${current.vote_average.toFixed(1)}/10` : 'NA'}</h1>
                                </div>
                            </motion.div>
                            <motion.div 
                                variants={infoCardVariants}
                                className="p-2 -z-10 bg-black rounded-xs border-l border-t border-b border-[rgba(255,255,255,0.1)] w-fit h-fit flex justify-end flex-wrap">
                                {current.genres.map((genre: any, index: number) => (         
                                    <span key={genre.id} className="text-right">
                                        {genre.name}
                                        {index < current.genres.length - 1 && ','}
                                    </span>           
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div 
                            variants={rightSectionVariants}
                            className="flex flex-col absolute left-79.5 py-2 -z-10 justify-between h-full pointer-events-none">
                            <div className="bg-black/80 backdrop-blur-3xl border-t border-r border-b border-[rgba(255,255,255,0.1)] rounded-xs p-2 pl-2.5 -z-10 w-fit">
                                <div
                                    className="rounded-xs  bg-neutral-700  cursor-pointer pointer-events-auto"
                                >
                                    <motion.div 
                                            onClick={() => setCurrent(null)}
                                            variants={closeButtonVariant}
                                            className="w-fit h-fit rounded-xs  cursor-pointer"
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2 }}>
                                        <X strokeWidth={1.1} size={28} />
                                    </motion.div>

                                </div>
                            </div>
                            <div className="text-sm -z-10 w-fit h-fit bg-black text-neutral-500 backdrop-blur-3xl border-r border-t border-b border-[rgba(255,255,255,0.1)]">
                                <div className="pb-20 font-medium px-4 py-2 overflow-y-auto w-70 h-91.5 mask-b-from-70% pointer-events-auto">
                                    {current.overview}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={mediaSectionVariants}
                            className="absolute -bottom-12 right-12 -z-10">
                            <WhereToWatchButton mediaType={mediaData.mediaType} id={mediaData.id} name={name} forHomePage={true}/>
                        </motion.div>
                    </motion.div>
                )}
            </PopupWrapper>

            <MediaCard mediaData={mediaData} forHomepage={true}/>

            <motion.div 
                className="relative w-58 aspect-[2/3] cursor-pointer mx-auto rounded-xs hidden 800:flex "
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20
                }}>
                
                <div 
                    className="group relative w-full h-full rounded-[0.20rem] overflow-hidden shadow-xs bg-black/50 duration-300 transform"
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    onClick={() => setCurrent(mediaData)}
                    >
                    
                    {mediaData.poster_path ? 
                        <motion.div
                            className="absolute inset-0"
                            animate={isHover ? 'hovered' : 'normal'}
                            variants={{
                                normal: { scale: 1, opacity: 1 },
                                hovered: { scale: 1.08, opacity: 1 }
                            }}

                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                            <img
                                src={mediaData.poster_path ? `https://image.tmdb.org/t/p/w500${mediaData.poster_path}` : '/placeholder-movie.jpg'}
                                alt={mediaData.title}
                                className="w-full h-full"
                            />
                        </motion.div>
                        :
                        <div className="absolute inset-0 w-full h-full backdrop-blur-lg hover:scale-105 duration-200 "></div>
                    }

                    <ProgressiveBlur
                        className='pointer-events-none absolute bottom-0 left-0 h-[50%] w-full'
                        blurIntensity={0.8}
                        animate={isHover ? 'visible' : 'hidden'}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 }
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    />
                    
                    <motion.div
                        className='absolute bottom-0 left-0 w-full'
                        animate={isHover ? 'visible' : 'hidden'}
                        variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                        
                        
                        <div className="absolute bottom-0 p-4 space-y-2 w-full">
                            <motion.h1 
                                className="text-xl font-bold"
                                initial={{ y: 10, opacity: 0 }}
                                animate={isHover ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
                                transition={{ duration: 0.3, delay: 0.05 }}>
                                {mediaData.title || mediaData.name}
                            </motion.h1>
                            <motion.div 
                                className='flex gap-2 items-center'
                                initial={{ y: 10, opacity: 0 }}
                                animate={isHover ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}>
                                <img 
                                    src="/logo-imdb.svg" 
                                    alt="IMDb Logo" 
                                    className="w-10 h-auto" 
                                />
                                <h1 className="text-xl font-light">{mediaData.vote_average ? `${mediaData.vote_average.toFixed(1)}/10` : 'NA'}</h1>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </>
    )
}