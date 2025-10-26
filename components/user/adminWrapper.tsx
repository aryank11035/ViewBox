'use client'

import { getMovieById, getMovieVideoById, getWheretoWatchById } from "@/lib/helpers"
import { SearchWrapper } from "./searchWrapper"
import { ResultWrapper } from "./resultWrapper"
import { useState } from "react"

export function AdminWrapper(){

    const [selectMedia,setSelectedMedia] = useState<any>(null)

    const getMedia = async (id : number,mediaType : 'movie' | 'tv' = 'movie' ,) => {
        const data = await getMovieById(id,mediaType ) as any
        const mediaVideoData = await getMovieVideoById(mediaType,id) || []
        const videoKey =mediaVideoData[0]?.key || null
        const whereToWatch = await getWheretoWatchById(mediaType,id)
        setSelectedMedia({
            ...data,
            videokey : videoKey,
            whereToWatch :  whereToWatch,
        })
    }

    return (
        <div  className="max-w-[1700px] min-h-screen mx-auto border-l border-r border-white/10 bg-black/30 p-2 flex md:flex-row flex-col gap-2">
            <SearchWrapper getMediaInfo={getMedia}/>
            <div className=" min-h-screen  mx-auto  flex-1 w-full ">
            {selectMedia && (
                    <ResultWrapper media={selectMedia}/>
                )
            }
            </div>
        </div>
    )
}