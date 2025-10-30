import MediaCard from "@/components/mediaCard"
import { getFavourites } from "../actions/favourites"
import { SliderMediaCardSection } from "@/components/mediaCardsSection"
import { getAdminAcess } from "@/data/user"

export default async function FavouritesPage(){

    const allFavouritesMovies = await getFavourites()
    
    return (
         <section className="max-w-full pt-20 mx-auto bg-[#111111] backdrop-blur-2xl text-xl font-bold  min-h-screen   ">
            <div className="max-w-[1450px] min-h-screen  p-4 mx-auto border-l border-r border-white/10 bg-black/30 px-6 relative ">
                <div className="max-w-[1500px] mx-auto flex flex-col gap-6">
                    <div className="w-full md:text-3xl">
                        <h1>Your Favourites</h1>
                    </div>
                    <div className="w-full h-15 bg-blue-100">

                    </div>
                        <div className="w-fit  grid grid-cols-5 gap-4 mx-auto">
                                <SliderMediaCardSection mediaData={allFavouritesMovies}/>
                        </div>
                    
                </div>
            </div>
        </section >
    )
}