
import { getFavourites, getFavouritesGenres, getFavouritesIds } from "../actions/favourites"    
import { Movie } from "@/schema/type"
import { getAllOverratedVotes, getAllUnderratedVotes } from "../actions/votes"
import FavCardsPage from "@/components/media/favourite/fav-card-page"
import { auth } from "@/auth"

interface favPageProps {
    searchParams : Promise<{ genre ?: string , sortBy ?: string}>
}

export function sortMovies(movies: Movie[], sortBy: string) : Movie[] {
    const sorted = [...movies]

    switch(sortBy) {
    case 'title':
        return sorted.sort((a, b) => 
            (a.title || '').localeCompare(b.title || '')
        )
    case 'year':
        return sorted.sort((a, b) => {
            const yearA = a.release_date ? new Date(a.release_date).getFullYear() : 0
            const yearB = b.release_date ? new Date(b.release_date).getFullYear() : 0
            return yearB - yearA // Newest first
        })
    case 'rating':
        return sorted.sort((a, b) => 
            (b.vote_average || 0) - (a.vote_average || 0) // Highest first
        )
    default:
        return sorted
    }
}


export default async function FavouritesPage({searchParams} : favPageProps){
    const params = await searchParams
    const selectedGenre = params.genre || 'All Genres'
    const sortBy = params.sortBy || 'title'

    const favMovies = await getFavourites()
    const favGenres = await getFavouritesGenres()
    const favIds = await getFavouritesIds()
    const overratedVotes = await getAllOverratedVotes()
    const underratedVotes = await getAllUnderratedVotes()
    const session = await auth()

    let filteredMovies  : Movie[] = !selectedGenre || selectedGenre  === 'All Genres' 
        ? favMovies 
        : favMovies.filter(
            (movie: Movie) => 
            movie.genres.some((genre: { name: string }) => genre.name === selectedGenre)
        )

    filteredMovies = sortMovies(filteredMovies , sortBy)

    return (
         <section className="max-w-full pt-20 mx-auto bg-[#111111] backdrop-blur-2xl text-xl font-bold  min-h-screen   ">
            <div className="max-w-[1450px] min-h-screen mx-auto border-l border-r border-white/10 bg-black/30  relative ">
                <FavCardsPage favMovies={filteredMovies} sortBy={sortBy} selectedGenre={selectedGenre} allGenres={favGenres} isFavouriteSet={favIds} isUnderratedSet={underratedVotes} isOverratedSet={overratedVotes} session={session}/>
            </div>
        </section >

        
    )
}   