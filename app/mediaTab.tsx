import Link from "next/link";
import { getShowData } from "./ts/getData";

export default async function MediaTab(){
    const movies = await getShowData() 
    console.log(movies)
    return (
        

                
                <div className="mx-auto grid gap-5 mt-15 
                    grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 place-items-center ">
                    {movies.results.map((movie: any) => (
                    <Link href={`/${movie.id}`}  key={movie.id} className="block w-full"> 
                        <div 
                        
                        className="relative w-full aspect-[2/3]  cursor-pointer"
                        >
                        <div className="absolute inset-0 rounded-xs border border-white/10 flex items-end">
                            <h1 className="text-2xl pl-5 pb-5 font-bold text-white/20">+ Add to Watchlist</h1>
                        </div>
                        <div className="group relative w-full h-full rounded-xs overflow-hidden shadow-xs 
                                        duration-300 transform
                                        hover:translate-x-8 hover:-translate-y-14 hover:z-10">
                            {/* Background Image */}
                            <img
                            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder-movie.jpg'}
                            alt={movie.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 duration-300"
                            />

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                            {/* Info */}
                            <div className="absolute bottom-0 p-4 text-white space-y-2">
                            <h1 className="text-2xl font-bold">{movie.title}</h1>
                            <h1 className="text-xl font-light">{movie.vote_average.toFixed(1)}/10</h1>
                            </div>
                        </div>
                        </div>
                    </Link>
                    ))}
                </div>
  

    )
}