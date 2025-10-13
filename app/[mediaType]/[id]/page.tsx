import { getMovie } from "@/app/actions/getMovie"
import MediaPage from "@/components/media/MediaPage"
import {  getMovieById, getMovieVideoById, getRelatedMedia, getShowData, getTrendingData, getWheretoWatchById } from "@/lib/helpers"
import { auth } from "@/auth"
import { notFound } from "next/navigation"
import { Movie, Session } from "@/schema/type"

type Params = {
    params : {
        mediaType : 'movie' | 'tv',
        id : number
    }
}

export default async function ShowMedia({params} : Params) {
    const { mediaType,id } = await params
    const session = await auth() as Session | null
    const trendingData = (await getShowData(mediaType)).slice(0,6)
    const mediaData = await getMovieById(id,mediaType) as Movie
    const mediaVideoData = await getMovieVideoById(mediaType,id) || []
    const videoKey =mediaVideoData[0]?.key ||   false
    const whereToWatch = await getWheretoWatchById(mediaType,id)
    const addedMediaData = await getMovie(session)  as Movie[]
    const isInWatchlist = addedMediaData.some((item : Movie) => item.id  == id) 
    const relatedMovies = await getRelatedMedia(mediaType,id)
    console.log(relatedMovies)
    if(!mediaData) {
            notFound()
    } 
        return (
            <MediaPage 
                mediaData={mediaData} 
                id={id} 
                mediaType={mediaType} 
                session={session} 
                isInWatchList={isInWatchlist} 
                videoKey={videoKey} 
                whereToWatch={whereToWatch}
                relatedMovies={relatedMovies}
                trendingData={trendingData}
            /> 
        )
}

                                   