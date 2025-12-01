import { getMovieWithId, getRelatedMovies } from "@/app/actions/getMovie"
import MediaPage from "@/components/media/MediaPage"
import {  getMovieById, getMovieVideoById, getShowData, getWheretoWatchById } from "@/lib/helpers"
import { auth } from "@/auth"
import { notFound } from "next/navigation"
import { getAdminAcess } from "@/data/user"
import { getFavMovieIdById } from "@/app/actions/favourites"
import { getUserOverratedMoviesIdById, getUserUnderratedMoviesIdById } from "@/app/actions/votes"
import { PopUpStatesProvider } from "@/components/custom-hooks/hooks"
import { Movie } from "@/schema/type"

type Params = {
    params : {
        mediaType : 'movie' | 'tv',
        id : number ,
    }
}

export type VideoTralier = {
     so_639_1: string,
    iso_3166_1: string,
    name: string ,
    key: string ,
    site: string ,
    size: number ,
    type: string ,
    official: boolean
    published_at: string ,
    id: string 
}

export default async function ShowMediaPage({params} : Params) {
    const { mediaType,id } = await params as { mediaType : 'movie'| 'tv' , id : number  }

    if (!id || isNaN(Number(id))) {
        notFound();
    }

    const session = await auth()
    const trendingData = (await getShowData(mediaType)).slice(0,6) as Movie[]
    const mediaData = await getMovieById(id,mediaType) as Omit<Movie , '_id'| 'overrated' | 'underrated' >
    const mediaVideoData = await getMovieVideoById(mediaType,id) || [] as VideoTralier[]
    const trailerVideo = mediaVideoData.find((video : VideoTralier) => video.type ===  'Trailer')
    const videoKey =trailerVideo?.key || mediaVideoData[0]?.key || null
    const whereToWatch = await getWheretoWatchById(mediaType,id)
    
    const relatedMovies = await getRelatedMovies()
    const isAdmin = await getAdminAcess()
    // const getOverated = getUserOveratedMovies()
    
    const allMediaData = {
        ...mediaData,
        language : mediaData.original_language,
        videokey : videoKey,
        whereToWatch :  whereToWatch,
    }


    
    
    const selectedMedia = await getMovieWithId(id) || false
    const isOverrated = await getUserOverratedMoviesIdById(selectedMedia._id) || false
    const isUnderrated = await getUserUnderratedMoviesIdById(selectedMedia._id) || false
    const isFavourite = await getFavMovieIdById(selectedMedia._id) || false
    





    return (
        <PopUpStatesProvider>

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

        </PopUpStatesProvider>
    
    )
}

                                