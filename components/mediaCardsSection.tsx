'use client'
import { Star } from "lucide-react"

import { ProgressiveBlur } from "./motion-primitives/progressive-blur"
import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import MediaCard from "./mediaCard";

 


export function SliderMediaCardSection({mediaData , enable} : {mediaData : any , enable : boolean}) {

  
   

    const dataFilter = mediaData.map((media: any) => ( 
        <div key={media.id}>
                <MediaCard mediaData={media} enable={enable}/>
        </div>

    ))

    return dataFilter
}