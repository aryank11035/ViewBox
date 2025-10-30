'use client'

import { useState } from "react";
import { Carousel, CarouselContent, CarouselIndicator, CarouselItem, CarouselNavigation } from "../motion-primitives/carousel"
import { BackDropSlider } from "./backdropSilder"

export function HomeSilderSection({backDropImages} : {backDropImages : string[]}){
    const [index, setIndex] = useState(0);
    const safeIndex = Math.min(Math.max(index, 0), backDropImages.length - 1)
    return(
        <div className="w-full mx-auto realtive ">

            <Carousel >
                <CarouselContent>
                    {
                        backDropImages.map((img: string,index : number)=>(
                            <CarouselItem key={index}>
                                <div className="w-full overflow-hidden h-170   relative" >
                                        <div className="w-full h-full  ">
                                            <img
                                                src={img ? `https://image.tmdb.org/t/p/original${img}` : '/placeholder-movie.jpg'}
                                                className="absolute inset-0 object-cover w-full h-full"
                                            />

                                        </div>   
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/70 to-transparent" ></div>     
                                </div>

                            </CarouselItem>
                        ))
                    }
                    
                </CarouselContent>
                <CarouselNavigation
                    className='absolute bottom-80  left-auto top-auto w-full justify-between gap-2 '
                    classNameButton='bg-black/40 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800 backdrop-blur-2xl'
                    alwaysShow
                    
                />
            </Carousel> 
        </div>
    )
}   