import { getMovie, getMovieWithId } from "@/app/actions/getMovie"
import MediaPage from "@/components/media/MediaPage"
import {  getMovieById, getMovieVideoById, getRelatedMedia, getShowData, getTrendingData, getWheretoWatchById } from "@/lib/helpers"
import { auth } from "@/auth"
import { notFound } from "next/navigation"
import { getAdminAcess } from "@/data/user"
import { getFavMovieIdById, getFavouritesIds } from "@/app/actions/favourites"
import { getUserOverratedMoviesIdById, getUserUnderratedMoviesIdById } from "@/app/actions/votes"

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
    const isInWatchlist = false  
    const relatedMovies = await getRelatedMedia(mediaType,id)
    const isAdmin = await getAdminAcess()
    // const getOverated = getUserOveratedMovies()
    
    const allMediaData = {
        ...mediaData,
        videokey : videoKey,
        whereToWatch :  whereToWatch,
    }

  
    
    
    const selectedMedia = await getMovieWithId(id)
    const isOverrated = await getUserOverratedMoviesIdById(selectedMedia._id)
    const isUnderrated = await getUserUnderratedMoviesIdById(selectedMedia._id)
    const isFavourite = await getFavMovieIdById(selectedMedia._id)

   


    if(!mediaData) {
            notFound()
    } 


    return (

    
        <MediaPage 
            allMediaData = {selectedMedia ? selectedMedia : allMediaData}
            isOverrated={isOverrated}
            isUnderrated={isUnderrated}
            isFavourite={isFavourite}
            mediaData={mediaData}
            mediaType={mediaType} 
            session={session} 
            videoKey={videoKey} 
            whereToWatch={whereToWatch}
            relatedMovies={relatedMovies}
            trendingData={trendingData}
            isAdmin={isAdmin}
        /> 
    )
}

                                   