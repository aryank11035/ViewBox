import MediaCard from "@/components/mediaCard"
import { getFavourites } from "../actions/favourites"
import FavCard from "@/components/media/favourite/fav-card"

export default async function FavouritesPage(){

   const favMovies = await getFavourites()
    // console.log(allFavouritesMovies)
    const movie = favMovies[0]
    console.log(movie)
    return (
         <section className="max-w-full pt-20 mx-auto bg-[#111111] backdrop-blur-2xl text-xl font-bold  min-h-screen   ">
            <div className="max-w-[1450px] min-h-screen  p-4 mx-auto border-l border-r border-white/10 bg-black/30 px-6 relative ">
                <div className="max-w-[1500px] mx-auto flex flex-col gap-6">
                    <div className="w-full md:text-3xl">
                        <h1>Your Favourites</h1>
                    </div>
                    <div className="w-full h-15 bg-blue-100">
                    </div>
                        
                    <FavCard media={movie} />
                </div>
            </div>
        </section >

        
    )
}   