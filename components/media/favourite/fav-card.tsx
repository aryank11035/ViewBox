'use client'

import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur"
import { Movie } from "@/schema/type"
import { useEffect, useRef, useState } from "react"
import { motion } from 'framer-motion'
import { X } from "lucide-react"
import { HeartButton } from "./heart-button"
import { AddedMssg } from "./added-mssg"
import { RemovedMssg } from "./removed-mssg"
import PopupWrapper from "@/components/popup-wrapper"
import Link from "next/link"
import VotesComp from "../votes/votes-comp"


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

interface FavCardProps {
    media : Movie , 
    isFavourite : boolean , 
    isOverrated : boolean , 
    isUnderrated : boolean
}


export default function FavCard({media , isFavourite , isOverrated , isUnderrated} : FavCardProps){



    
    const [current , setCurrent] = useState<Movie | null>(null)

    const ref = useOutsideClick(() => setCurrent(null))

    const [initialState , setInitialState] = useState<boolean>(isFavourite)
    const [overratedVote,setOverratedVote] = useState(isOverrated)
    const [underratedVote,setUnderratedVote] = useState(isUnderrated)
    const [overratedNumber,setOverratedNumber] = useState(media.overrated)
    const [underratedNumber,setUnderratedNumber] = useState(media.underrated)
    const [favouritesResponse,setFavouriteResponse] = useState<handleFavouritesProps | undefined>(undefined)
    
    const onFavoritesChange = (res : handleFavouritesProps , favourite : boolean) => {
        setInitialState(favourite)
        setFavouriteResponse(res)
    }

    const onOverrateVoteChange = ( vote : boolean , number : number) => {
        setOverratedVote(vote)
        setOverratedNumber(number)
    }

    const onUnderateVoteChange  = ( vote : boolean ,number : number) => {
        setUnderratedVote(vote)
        setUnderratedNumber(number)
    }
    const [open,setOpen] = useState(false)

    const handleClick = (media : any ) => {
        setCurrent(media)
        
        console.log(media)
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
                                    className=" bg-[#111111] z-20 rounded-xs flex gap-2 md:gap-4 md:w-180 flex-col md:flex-row md:h-[463px]  overflow-hidden border border-[rgba(255,255,255,0.1)]  w-full  mx-6 " 
                                    ref={ref} 
                                >
                                    <div className="w-fit flex gap-2">
                                        <motion.div 
                                            layoutId={`card-${media.poster_path}`}
                                            className="760:w-67 aspect-[2/3] md:mx-0 "
                                        >
                                            <img src={ `https://image.tmdb.org/t/p/w500${current.poster_path}`} className="w-full h-full rounded-xs" />
                                        </motion.div>
                                        <div
                                            className="flex flex-col gap-1 md:hidden "
                                        >
                                            <div className="w-full h-fit bg-neutral-800 rounded-xs flex justify-center p-2">
                                                <motion.button onClick={() => setCurrent(null)} variants={closeButtonVariant} initial='hidden' animate='visible' exit='hidden' className="flex justify-end text-white/50 md:hidden  cursor-pointer w-fit h-fit"><X /></motion.button>
                                            </div>
                                            <div className="w-full h-full bg-neutral-900 rounded-xs">

                                            </div>
                                            <motion.div 
                                                className=' rounded-xs'>
                                                <HeartButton mediaInfo={media} initialFavourite={initialState} onFavoritesChange={onFavoritesChange}/>
                                            </motion.div>
                                            <VotesComp 
                                            icon={true} 
                                            votes={{
                                                id : media._id ,
                                                overrated : overratedNumber,
                                                underrated : underratedNumber, 
                                                overratedVoted : overratedVote ,
                                                underratedVoted : underratedVote 
                                            }}
                                            page={false} 
                                            onOverrateVoteChange={onOverrateVoteChange}
                                            onUnderrateVoteChange={onUnderateVoteChange}
                                            />
                                        </div>

                                    </div>
                                    <div
                                        className="flex flex-col gap-2 " 
                                    >
                                        <motion.div
                                            layoutId={`card-${media.title}`}
                                            className="text-2xl md:text-3xl tracking-tighter w-full flex justify-between ">
                                                <p>
                                                    {current.title}   
                                                </p>
                                                <motion.button onClick={() => handleClick(null)} variants={closeButtonVariant} initial='hidden' animate='visible' exit='hidden' className="md:flex justify-end text-white/50  hidden  cursor-pointer w-fit h-fit"><X /></motion.button>
                                        </motion.div>

                                        <p className="text-xs   text-white/30 font-medium">{current.release_date}</p>

                                        <motion.div className='flex gap-2  items-center'>
                                            <img 
                                                src="/logo-imdb.svg" 
                                                alt="IMDb Logo" 
                                                className="w-10  h-auto" 
                                            />
                                            <h1 className="text-sm md:text-xl font-light">{media.vote_average ? `${media.vote_average.toFixed(1)}/10`  : 'NA'}</h1>
                                        </motion.div>
                                        <div className="flex gap-2">
                                            <motion.div 
                                                layoutId={`liked-${media._id}`}
                                                className=' rounded-xs hidden md:flex'>
                                                <HeartButton mediaInfo={media} initialFavourite={initialState} onFavoritesChange={onFavoritesChange}/>
                                            </motion.div>


                                            {/* Link */}
                                            <WhereToWatchButton mediaType={media.mediaType} id={media.id} />
                                        </div>
                                        <div className="hidden md:block">
                                            <VotesComp 
                                                icon={false} 
                                                votes={{
                                                    id : media._id ,
                                                    overrated : overratedNumber,
                                                    underrated : underratedNumber, 
                                                    overratedVoted : overratedVote ,
                                                    underratedVoted : underratedVote 
                                                }}
                                                page={false} 
                                                onOverrateVoteChange={onOverrateVoteChange}
                                                onUnderrateVoteChange={onUnderateVoteChange}
                                            />
                                        </div>
                                        <motion.div className="bg-white/30 rounded-xs text-xs flex-wrap w-fit p-2 font-medium space-y-1.5">
                                        {
                                            current.genres.map((genre : any,index : number) => (         
                                                <span key={genre.id}>
                                                    {genre.name}
                                                    {index < current.genres.length - 1 && ', '}
                                                </span>           
                                            ))
                                        }
                                        </motion.div>
                                        <p className="text-wrap text-xs font-medium text-white/30 overflow-auto pb-20 h-30 md:h-full mask-b-from-0.5">
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
                            className="w-35 420:w-45 760:w-50 1435:w-[15.960rem] aspect-[2/3] relative rounded-xs backdrop-blur-2xl cursor-pointer mx-auto ">


                            <div className="absolute top-1 right-1 z-40 flex flex-col gap-1">
                                <motion.div 
                                    layoutId={`liked-${media._id}`} 
                                >
                                    <HeartButton mediaInfo={media} initialFavourite={initialState} onFavoritesChange={onFavoritesChange}/>
                                </motion.div>

                                <VotesComp 
                                    icon={true}
                                    votes={{
                                        id : media._id ,
                                        overrated : overratedNumber,
                                        underrated : underratedNumber, 
                                        overratedVoted : overratedVote ,
                                        underratedVoted : underratedVote 
                                   }} 
                                    onOverrateVoteChange={onOverrateVoteChange}
                                    onUnderrateVoteChange={onUnderateVoteChange}
                                   />
                            
                            </div>


                            <motion.div 
                                layoutId={`card-${media.poster_path}`}
                                className="absolute inset-0 rounded-xs  ">
                                <motion.img 
                                    
                                    src={ `https://image.tmdb.org/t/p/w500${media.poster_path}`} className="w-full h-full rounded-xs cursor-pointer"
                                />
                            </motion.div>

                            <ProgressiveBlur 
                                className="pointer-events-none absolute bottom-0 left-0 h-[40%] w-full rounded-xs z-30"
                                blurIntensity={3}
                            />
                            <AddedMssg added={favouritesResponse?.added} />
                            <RemovedMssg removed={favouritesResponse?.removed} />

                            <div className="absolute inset-0 z-20  hover:bg-black/30 duration-200 bg-black/30 md:bg-transparent"   onClick={() => handleClick(media)}>

                            </div>
                            <div 
                                className="absolute bottom-0 p-4  space-y-2 w-full z-30 "
                            >
                                <motion.h1 
                                    layoutId={`card-${media.title}`}
                                    className=" 760:text-sm 1020:text-base text-xs font-bold text-left">
                                        {media.title}
                                </motion.h1>

                                <div className='flex gap-2 '>
                                    <img 
                                        src="/logo-imdb.svg" 
                                        alt="IMDb Logo" 
                                        className="w-8 md:w-10  h-auto" 
                                    />
                                    <h1 className="text-sm md:text-xl font-light">{media.vote_average ? `${media.vote_average.toFixed(1)}/10`  : 'NA'}</h1>
                                </div>
                            </div>
                        </motion.div>                 
                  
       </>

    )
}


interface WhereToWatchButtonProps {
    mediaType : string , 
    id : number
}

export const WhereToWatchButton = ({mediaType , id} : WhereToWatchButtonProps) => {

    const [isHover,setIsHover] = useState(false)
    return (
        <Link href={`/${mediaType}/${id}`}  key={id}>
            <motion.button 
            className="bg-neutral-800 md:p-4 p-2 items-center  rounded-xs h-full  text-xs md:text-sm font-light hover:bg-[#FFFFFFE6] hover:text-black cursor-pointer duration-100 flex gap-2"
            onMouseEnter = {() => setIsHover(true)}
            onMouseLeave = {() => setIsHover(false)}
            >


            Find where to watch
            <motion.div 
                initial = {{ opacity : 1  }}
                animate = { isHover ? 'hovered' : 'normal' }
                variants={{
                    normal : { rotate : 6 , y : 2},
                    hovered : { rotate : 6 , y : -2 , x : 3}, 
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
    )
}