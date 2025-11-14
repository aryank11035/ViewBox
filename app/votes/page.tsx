import FavCardsPage from "@/components/media/favourite/fav-card-page"
import { getAllOverratedVotes, getAllUnderratedVotes, getOverratedMedia, getVotedGenres, getVotedMedia, getVotes } from "../actions/votes"
import { getFavouritesIds } from "../actions/favourites"
import { sortMovies } from "../favourites/page"
import { Movie } from "@/schema/type"

interface votesPageProps {
    searchParams : Promise<{ genre ?: string , sortBy ?: string , voted ?: string }>
}


export default async function VotesPage({searchParams} : votesPageProps){
    const params = await searchParams
    const selectedGenre = params.genre || 'All Genres'
    const sortBy = params.sortBy || 'title'
    const voted = params.voted || 'both'


    const votedMedia = await getVotedMedia('both')
    const votedGenres = await getVotedGenres()
    const favIds = await getFavouritesIds()
    const overratedVotes = await getAllOverratedVotes()
    const underratedVotes = await getAllUnderratedVotes()

   
    let filteredByVote : Movie [] = votedMedia
    if (voted === "underrated") {
        filteredByVote = votedMedia.filter((movie: Movie) => movie.underrated > 0)
    } else if (voted === "overrated") {
            filteredByVote = votedMedia.filter((movie: Movie) => movie.overrated > 0)
    }
    
    let filteredMovies  : Movie[] = !selectedGenre || selectedGenre  === 'All Genres' 
            ? filteredByVote 
            : filteredByVote.filter(
                (movie: Movie) => 
                movie.genres.some((genre: { name: string }) => genre.name === selectedGenre)
            )

            
    filteredMovies = sortMovies(filteredMovies , sortBy)

        
    return (
        <section className="w-full bg-[#111111] pt-20">
            <div className="max-w-[1450px] mx-auto border-l border-r border-[rgba(255,255,255,0.1)] w-full  min-h-screen px-6 p-4"> 
               <FavCardsPage favMovies={filteredMovies} sortBy={sortBy} selectedGenre={selectedGenre} allGenres={votedGenres} isFavouriteSet={favIds} isUnderratedSet={underratedVotes} isOverratedSet={overratedVotes} showVote={true} voted={voted}/>
            </div>
        </section>
    )
}