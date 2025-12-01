'use client'

import { InfiniteSlider } from "../motion-primitives/infinite-slider"
import { SliderMediaCardSection } from "../mediaCardsSection"
import {  motion } from "framer-motion"
import { Movie } from "@/schema/type"

export default function UpdatedSection({mediaData } : {mediaData : Movie[] }){
   
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
                
                </motion.div>
            </>

)   
}

