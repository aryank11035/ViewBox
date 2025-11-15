'use client'

import { useState } from "react";
import { Carousel, CarouselContent, CarouselIndicator, CarouselItem, CarouselNavigation, CarouselNavigationProps } from "../motion-primitives/carousel"
import { BackDropSlider } from "./backdropSilder"
import { AnimatePresence, motion } from 'framer-motion'
import { Movie } from "@/schema/type";
import { WhereToWatchButton } from "../media/favourite/fav-card";
import { HeartButton } from "../media/favourite/heart-button";
import React from "react";

const infoCardVaraints = {
    hidden: { 
        opacity: 0, 
        y: 20,
        filter : 'blur(10px)', 
    },
    visible: { 
        opacity: 1, 
        y: 0,
        filter : 'blur(0px)',
        transition: { 
            duration: 0.5,  
            delay : 0.2,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
} as any


interface HomeSliderSectionProps {
    medias : Movie []
    isFavourites : Set<string>
}

export function HomeSilderSection({medias , isFavourites} : HomeSliderSectionProps){


    const [index, setIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    
    
    return(
        <div className="w-full mx-auto">

            <Carousel 
                index={index} 
                onIndexChange={(i) => {
                    setIndex(i)    
                    setActiveIndex(i)
                }}>
                <CarouselContent>
                    {
                        medias.map((media: Movie, i : number)=>(
                            <CarouselItems media={media} i={i} activeIndex={activeIndex} isFavourite={isFavourites.has(media._id)} key={i}/>
                        ))
                    }
                    
                </CarouselContent>
                <CarouselNavigation
                    className='absolute lg:bottom-80 md:bottom-50 left-auto top-auto w-full justify-between gap-2 hidden md:flex z-40 cursor-pointer'
                    classNameButton='bg-black/40 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800 backdrop-blur-2xl'
                    alwaysShow
                    
                />
              
            </Carousel> 
        </div>
    )
}   

interface CarouselItemsProps {
    media : Movie , 
    i : number ,
    activeIndex : number ,
    isFavourite : boolean
}
export const CarouselItems = ({media , i , activeIndex , isFavourite} : CarouselItemsProps) => {

    const [initialState , setInitialState] = useState<boolean>(isFavourite)

    const onFavouriteChange = (res : boolean , favourite : boolean) => {
        setInitialState(favourite)
    }
    return  (
        <CarouselItem key={i}>
            <div className="w-full overflow-hidden h-[50vh] md:h-[60vh]  lg:h-[90vh] relative cursor-pointer text-neutral-200" >
                    <div className="w-full h-full ">
                        <img
                            src={media.backdrop_path ? `https://image.tmdb.org/t/p/original${media.backdrop_path}` : '/placeholder-movie.jpg'}
                            className="absolute inset-0 object-cover w-full h-full "
                        />

                    </div>   
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/70 to-transparent z-30" ></div>     
                    <div className="absolute inset-0 p-8 flex items-end z-40 ">
                        <AnimatePresence mode="wait">
                        {
                            activeIndex  === i && (
                                
                        
                                        <motion.div 
                                            key={media._id}
                                            variants={infoCardVaraints}
                                            initial='hidden'
                                            animate='visible'
                                            exit='hidden'
                                            className="w-full mx-auto flex flex-col max-w-[1450px] gap-2 "
                                        >
                                            <h1 className="text-4xl md:text-5xl font-bold ">
                                                {media.title}
                                            </h1>
                                            <div className="flex gap-2  ">
                                                <p>{media.release_date?.slice(0,4)}</p>
                                                <div className="border-l border-[rgba(255,255,255,0.3)] h- ">

                                                </div>
                                                <p className="tracking-tight">
                                                    {media.genres?.map(g => g.name).join(", ")}
                                                </p>
                                            </div>
                                            <div className='flex gap-2  items-center'>
                                                <img 
                                                    src="/logo-imdb.svg" 
                                                    alt="IMDb Logo" 
                                                    className="w-11  h-auto" 
                                                />
                                                <h1 className="font-bold">{media.vote_average.toFixed(1)}</h1>
                                            </div>
                                            <div className="flex gap-1">
                                                <HeartButton mediaInfo={media} initialFavourite={initialState} onFavoritesChange={onFavouriteChange}/>
                                                <WhereToWatchButton mediaType={media.mediaType} id={media.id} />
                                            </div>
                                        </motion.div>
                            )
                        }
                        </AnimatePresence>
                    </div>
            </div>

        </CarouselItem>
    )
}
