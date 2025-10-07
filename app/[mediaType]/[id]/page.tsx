import MediaPage from "@/app/components/MediaPage"
import {  getMovieById } from "@/app/lib/getData"
import Link from "next/link"

type Params = {
    params : {
        mediaType : 'movie' | 'tv',
        id : number
    }
}

export default async function ShowMedia({params} : Params) {
    const { mediaType,id } = await params

    const mediaData = await getMovieById(id,mediaType)


    // const addedMediaData = await fetch(`http://localhost:3000/api/media_data`).then(r => r.json())
    const isInWatchlist = false
    // addedMediaData.some((item : any) => item.id  == id) || false

    
    return (
     
        <MediaPage mediaData={mediaData} id={id} mediaType={mediaType} isInWatchList={isInWatchlist}/>
        
    )
}

                                   