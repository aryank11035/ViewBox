'use client'
import { Star } from "lucide-react"

import { ProgressiveBlur } from "./motion-primitives/progressive-blur"
import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import MediaCard from "./mediaCard";

 


export function SliderMediaCardSection({mediaData} : {mediaData : any}) {

  
   

    const dataFilter = mediaData.map((media: any) => ( 
        <div key={media.id}>
                <MediaCard mediaData={media} />
        </div>

    ))

    return dataFilter
}