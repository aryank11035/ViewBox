
import { getFavourites, getFavouritesGenres } from "../actions/favourites"
import FavCard from "@/components/media/favourite/fav-card"
import { Movie } from "@/schema/type"
import GenreOption from "@/components/media/favourite/genre-option"
import { Suspense } from 'react'
import SortOption from "@/components/media/favourite/sort-option"

interface favPageProps {
    searchParams : Promise<{ genre ?: string , sortBy ?: string}>
}

function sortMovies(movies: Movie[], sortBy: string) : Movie[] {
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


    let filteredMovies  : Movie[] = !selectedGenre || selectedGenre  === 'All Genres' 
        ? favMovies 
        : favMovies.filter(
            (movie: Movie) => 
            movie.genres.some((genre: { name: string }) => genre.name === selectedGenre)
        )

    filteredMovies = sortMovies(filteredMovies , sortBy)


    return (
         <section className="max-w-full pt-20 mx-auto bg-[#111111] backdrop-blur-2xl text-xl font-bold  min-h-screen   ">
            <div className="max-w-[1450px] min-h-screen  p-4 mx-auto border-l border-r border-white/10 bg-black/30 px-6 relative ">
                <div className="max-w-[1500px] mx-auto flex flex-col gap-6 ">
                    <div className="w-full md:text-3xl px-3">
                        <h1>Your Favourites</h1>
                    </div>
                    <div className="w-full max-w-[1365px] bg-neutral-900 rounded-xs flex items-center justify-between md:flex-row flex-col mx-auto px-4 py-4">
                        <SortOption sortBy={sortBy}/>
                        <GenreOption allGenres={favGenres} selectedGenre={selectedGenre}/>
                    </div>

                    <div className="w-fit  grid grid-cols-1 420:grid-cols-2 760:grid-cols-3 1020:grid-cols-4 1435:grid-cols-5 justify-items-center gap-4 mx-auto">
                        {
                            filteredMovies.map((media : Movie , index : number) =>  (
                                <FavCard media={media}    key={index} />
                            ))
                        }
                        
                    </div>
                </div>
            </div>
        </section >

        
    )
}   