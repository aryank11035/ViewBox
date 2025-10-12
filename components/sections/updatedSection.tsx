'use client'

import { InfiniteSlider } from "../motion-primitives/infinite-slider"
import { SliderMediaCardSection } from "../mediaCardsSection"
import { ProgressiveBlur } from "../motion-primitives/progressive-blur"

export default function UpdatedSection({mediaData } : {mediaData : any }){

    const dataFilter = mediaData.map((media: any) => ( 
        <h1>HEllo {media.title}</h1>
    ))

    return (
            <>
                <div className="relative overflow-hidden">

                    <InfiniteSlider 
                        speed={50}
                        speedOnHover={1} 
                        gap={20}
                        className="py-10"
                    >
                        <SliderMediaCardSection mediaData={mediaData} />
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
                </div>
            </>

)   
}

