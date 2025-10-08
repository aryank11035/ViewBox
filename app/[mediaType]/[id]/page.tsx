import { getMovie } from "@/app/actions/getMovie"
import MediaPage from "@/app/components/MediaPage"
import {  getMovieById } from "@/app/lib/getData"
import { auth } from "@/auth"
import { Movie } from "@/schema/type"
import Link from "next/link"
import { notFound } from "next/navigation"

type Params = {
    params : {
        mediaType : 'movie' | 'tv',
        id : number
    }
}

export default async function ShowMedia({params} : Params) {
    const { mediaType,id } = await params
    const session = await auth()
    const mediaData = await getMovieById(id,mediaType)

    
    const addedMediaData = await getMovie(session) || []
    const isInWatchlist = addedMediaData.some((item : any) => item.id  == id) 

   if(!mediaData) {
        notFound()
   } 
    return (
     
        <MediaPage mediaData={mediaData} id={id} mediaType={mediaType} isInWatchList={isInWatchlist}/>
        
    )
}

                                   