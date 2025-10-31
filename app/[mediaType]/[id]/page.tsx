import { getMovie } from "@/app/actions/getMovie"
import MediaPage from "@/components/media/MediaPage"
import {  getMovieById, getMovieVideoById, getRelatedMedia, getShowData, getTrendingData, getWheretoWatchById } from "@/lib/helpers"
import { auth } from "@/auth"
import { notFound } from "next/navigation"
import { getAdminAcess } from "@/data/user"

type Params = {
    params : {
        mediaType : 'movie' | 'tv',
        id : number
    }
}

export default async function ShowMedia({params} : Params) {
    const { mediaType,id } = await params
    const session = await auth() as any | null
    const trendingData = (await getShowData(mediaType)).slice(0,6)
    const mediaData = await getMovieById(id,mediaType) as any
    const mediaVideoData = await getMovieVideoById(mediaType,id) || []
    const trailerVideo = mediaVideoData.find((video : any) => video.type ===  'Trailer')
    const videoKey =trailerVideo?.key || mediaVideoData[0]?.key || null
    const whereToWatch = await getWheretoWatchById(mediaType,id)
    const addedMediaData = await getMovie(session)  as any[]
    // addedMediaData.some((item : any) => item.id  == id)
    const isInWatchlist = false  
    const relatedMovies = await getRelatedMedia(mediaType,id)
    const isAdmin = await getAdminAcess()

    
    const allMediaData = {
        ...mediaData,
        videokey : videoKey,
        whereToWatch :  whereToWatch,
    }

   
    // const mediaDataPage = await allData(allMediaData)
    
    

    if(!mediaData) {
            notFound()
    } 
    
    return (
        <MediaPage 
            allMediaData = {allMediaData}
            mediaData={mediaData} 
            id={id} 
            mediaType={mediaType} 
            session={session} 
            isInWatchList={isInWatchlist} 
            videoKey={videoKey} 
            whereToWatch={whereToWatch}
            relatedMovies={relatedMovies}
            trendingData={trendingData}
            isAdmin={isAdmin}
        /> 
    )
}

                                   