'use client'

import { InfiniteSlider } from "../motion-primitives/infinite-slider"
import { SliderMediaCardSection } from "../mediaCardsSection"

import {  motion } from "framer-motion"
import { useState } from "react"
export default function UpdatedSection({mediaData } : {mediaData : any }){
    const [activeDirection, setActiveDirection] = useState<"x" | "y" | null>(
        null
    )
   
    return (
            <>
                <motion.div 
                    className="relative overflow-hidden "
                >

                    <InfiniteSlider 
                        speed={50}
                        speedOnHover={1} 
                        gap={15}
                        className="py-6"
                    >
                        <SliderMediaCardSection mediaData={mediaData} enable={false} />
                    </InfiniteSlider>
                    {/* <ProgressiveBlur
                        className='pointer-events-none absolute top-0 left-0 h-full w-[150px]'
                        direction='left'
                        blurIntensity={0.2}
                    />
                    <ProgressiveBlur
                        className='pointer-events-none absolute top-0 right-0 h-full w-[100px]'
                        direction='right'
                        blurIntensity={0.2}
                    /> */}
                </motion.div>
            </>

)   
}

