
import { HomeSilderSection } from "@/components/home/homeSliderSection"
import { getBackdrop } from "@/lib/helpers"
import { getMovie, getRelatedMovies } from "../actions/getMovie"
import { Movie } from "@/schema/type"
import { getFavouritesIds } from "../actions/favourites"
import { getMoviesByLanguage, getMoviesLanguages } from "../actions/home"
import { getGenres } from "../actions/getGenres"
import HomePageClient from "@/components/home/home-page"
import { getAllOverratedVotes, getAllUnderratedVotes } from "../actions/votes"
import { auth } from "@/auth"

export default async function HomePage(){

    const session = await auth()

    const shows = await getMovie() 
    const showPosters = await getRelatedMovies()
    const languages = await getMoviesLanguages()



    const favIds = await getFavouritesIds()
    const underratedVotes = await getAllUnderratedVotes()
    const overratedVotes = await getAllOverratedVotes()
    const genres = await getGenres()
    
    return(
        <section className="w-full  mx-auto min-h-screen ">  

            <HomePageClient initialShows={shows} initialGenres={genres} languages={languages} isFavourites={favIds} underratedVotes={underratedVotes} overratedVotes={overratedVotes} showPosters={showPosters} session={session}/>
   
        </section>
    )
}   