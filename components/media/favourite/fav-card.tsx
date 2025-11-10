'use client'

import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur"
import { Movie } from "@/schema/type"
import { useEffect, useRef, useState } from "react"
import { FaHeart } from "react-icons/fa"
import { AnimatePresence, delay, easeIn, motion } from 'framer-motion'
import { X } from "lucide-react"
import { HeartButton } from "./heart-button"
import { AddedMssg } from "./added-mssg"
import { RemovedMssg } from "./removed-mssg"
import PopupPortal from "@/components/popup-wrapper"
import PopupWrapper from "@/components/popup-wrapper"
import Link from "next/link"
import { getFavouritesIds } from "@/app/actions/favourites"


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
            delay: 0.5
        }
    }
}

export interface handleFavouritesProps {
    success  : boolean,
    removed ? : string,
    added ?: string,
    error ?: string
}




export default function FavCard({media , isFavourite} : {media : Movie , isFavourite : boolean }){


    const [isHover,setIsHover] = useState(isFavourite)
    const [current , setCurrent] = useState<Movie | null>(null)
    const ref = useOutsideClick(() => setCurrent(null))

    const [initialState , setInitialState] = useState<boolean>(true)
    const [favouritesResponse,setFavouriteResponse] = useState<handleFavouritesProps | undefined>(undefined)
    const onFavoritesChange = (res : handleFavouritesProps , favourite : boolean) => {
          console.log("🖱️ onFavoritesChange triggered with:", { favourite, res })
        setInitialState(favourite)
        setFavouriteResponse(res)
    }

    useEffect(() => {
        const handleState = async () => {
            const favIds = await getFavouritesIds()
            console.log("📦 [FavCard] fetched fav IDs:", favIds)
    console.log("📦 Does it contain current media?", favIds.has(media._id))
            setInitialState(favIds.has(media._id))
        }
        handleState()
    },[current])


    useEffect(() => {
  console.log("💾 [FavCard] initialState changed:", initialState)
}, [initialState])
    
    const handleClick = (media : any ) => {
        setCurrent(media)
        console.log('pop up like state' , initialState )
        if(media) {

            console.log('pop up clicked')
        }

        
    }

    return(


        <>
         
            <PopupWrapper isOpen={!!current} onClose={() => setCurrent(null)}>
            {
                current && (          
                    
                                
                                //pop up div
                                 <motion.div 
                                    variants={containerVariants}
                                    initial='hidden'
                                    animate='visible'
                                    exit='hidden'
                                    layoutId={`card-${media._id}`}
                                    className=" bg-[#111111] z-20 rounded-xs flex gap-2 md:gap-4 md:w-180 flex-col md:flex-row md:h-[463px] overflow-hidden border border-[rgba(255,255,255,0.1)] mx-4 w-full mt-50 mb-50" 
                                    ref={ref}>
                                    <button onClick={() => setCurrent(null)} className="flex justify-end text-white/50 md:hidden cursor-pointer"><X /></button>
                                    <motion.div 
                                        layoutId={`card-${media.poster_path}`}
                                        className="760:w-67 aspect-[2/3] mx-auto md:mx-0 420:w-[300px] w-full"
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
                                                <motion.button onClick={() => handleClick(null)} variants={closeButtonVariant} initial='hidden' animate='visible' exit='hidden' className="md:flex justify-end text-white/50  hidden  cursor-pointer w-fit h-fit"><X /></motion.button>
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
                                            <motion.div 
                                                layoutId={`liked-${media._id}`}
                                                className=' rounded-xs'>
                                                <HeartButton mediaInfo={media} initialFavourite={initialState} onFavoritesChange={onFavoritesChange}/>
                                            </motion.div>


                                            {/* Link */}
                                            <Link href={`/${media.mediaType}/${media.id}`}  key={media.id}>
                                                <motion.button 
                                                    className="bg-white/10 p-4 rounded-xs h-full text-sm font-light hover:bg-[#FFFFFFE6] hover:text-black cursor-pointer duration-100 flex gap-2"
                                                    onMouseEnter = {() => setIsHover(true)}
                                                    onMouseLeave = {() => setIsHover(false)}
                                                >


                                                    Find where to watch
                                                        <motion.div 
                                                            initial = {{ opacity : 1  }}
                                                            animate = { isHover ? 'hovered' : 'normal' }
                                                            variants={{
                                                                normal : { rotate : 3 , y : -3},
                                                                hovered : { rotate : 2 , y : -5 , x : 3}, 
                                                            }}
                                                            transition={{                                        
                                                                duration : 0.3,
                                                                ease: [0, 0.71, 0.2, 1.01],
                                                            }}
                                                            className="size-3.5">
                                                            <svg width="100&" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6 18L18 6M18 6H10M18 6V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </motion.div>
                                                </motion.button>
                                            </Link>
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
                                        <p className="text-wrap text-sm font-medium text-white/30 overflow-auto pb-20 h-30 md:h-full ">
                                            {media.overview} 
                                        </p>
                                    </div>
                                </motion.div>

                )
            }
        </PopupWrapper>
                    {/* card div */}
                        <motion.div 
                            layoutId={`card-${media._id}`}
                            key={media._id}
                            className="w-67 420:w-45 760:w-50 1435:w-65 aspect-[2/3] relative rounded-xs backdrop-blur-2xl cursor-pointer mx-auto">

                            <motion.div 
                                 layoutId={`liked-${media._id}`}
                                className="absolute top-1 right-1 z-40"
                            >
                                <HeartButton mediaInfo={media} initialFavourite={initialState} onFavoritesChange={onFavoritesChange}/>
                            </motion.div>


                            <motion.div 
                                layoutId={`card-${media.poster_path}`}
                                className="absolute inset-0 rounded-xs">
                                <img src={ `https://image.tmdb.org/t/p/w500${media.poster_path}`} className="w-full h-full rounded-xs cursor-pointer"/>
                            </motion.div>

                            <ProgressiveBlur 
                                className="pointer-events-none absolute bottom-0 left-0 h-[40%] w-full rounded-xs z-30"
                                blurIntensity={3}
                            />
                            <AddedMssg added={favouritesResponse?.added} />
                            <RemovedMssg removed={favouritesResponse?.removed} />

                            <div className="absolute inset-0 z-20"   onClick={() => handleClick(media)}>

                            </div>
                            <div 
                                className="absolute bottom-0 p-4  space-y-2 w-full z-30 "
                            >
                                <motion.h1 
                                    layoutId={`card-${media.title}`}
                                    className="420:text-xs 760:text-sm 1020:text-base  text-xl font-bold text-left">
                                        {media.title}
                                </motion.h1>

                                <div className='flex gap-2 '>
                                    <img 
                                        src="/logo-imdb.svg" 
                                        alt="IMDb Logo" 
                                        className="w-10  h-auto" 
                                    />
                                    <h1 className="text-xl font-light">{media.vote_average ? `${media.vote_average.toFixed(1)}/10`  : 'NA'}</h1>
                                </div>
                            </div>
                        </motion.div>                 
                  
       </>

    )
}