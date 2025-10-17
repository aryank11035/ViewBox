'use client'

import { CarouselItem } from "../motion-primitives/carousel"
import { BackDropImages } from "./backdropImages"

export function BackDropSlider({backDropImages} : {backDropImages : string[]}){

    const backDropSlider = backDropImages.map((img : string , index : number) => (
        <CarouselItem>
            <div className="w-full overflow-hidden h-170  mask-b-from-0%  mask-b-to-99%" key={index} >
                    <BackDropImages img={img} />
            </div>
        </CarouselItem>
    ))

    return backDropSlider
}