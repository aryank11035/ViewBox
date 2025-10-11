'use client'

import { InfiniteSlider } from "../motion-primitives/infinite-slider"
import { SliderMediaCardSection } from "../mediaCardsSection"

export default function UpdatedSection({mediaData } : {mediaData : any }){

    const dataFilter = mediaData.map((media: any) => ( 
        <h1>HEllo {media.title}</h1>
    ))

    return (
            <>
            <InfiniteSlider 
                    speed={50}
                    speedOnHover={1} 
                    gap={24}
                    className="py-10"
                >
                <SliderMediaCardSection mediaData={mediaData} />
            </InfiniteSlider>
            
            </>

)   
}

