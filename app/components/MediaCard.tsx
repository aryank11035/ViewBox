import Link from "next/link"
import { Star } from "lucide-react"
export default function MediaCard({mediaData, query} : {mediaData : any[] , query :string} ){
  
   

    return(
        <>
            {mediaData.map((item : any) => (
                <Link href={`/${item.mediaType ? item.mediaType : item.media_type}/${item.id}`}  key={item.id}> 
                    <div className="relative w-full aspect-[2/3]  cursor-pointer  shadow-xl shadow-black/30 mx-auto">
                        <div className="absolute inset-0 rounded-xs border border-white/10 flex items-end">
                            <h1 className="text-xl pl-5 pb-5 font-bold text-white/20">+ Add to Watchlist</h1>
                        </div>
                        <div className="group relative w-full h-full rounded-xs overflow-hidden shadow-xs 

                                        duration-300 transform
                                        hover:translate-x-8 hover:-translate-y-14 hover:z-10">
                            {
                                item.poster_path ? 
                                    <img
                                        src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '/placeholder-movie.jpg'}
                                        alt={item.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 duration-300"
                                    />
                                    :
                                    <div className="absoulte inset-0 w-full h-full  backdrop-blur-lg"></div>
                            }         
                                        
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 p-4 text-white space-y-2">
                                <h1 className="text-2xl font-bold">{item.title || item.name}</h1>
                                <div className='flex gap-2  items-center'>
                                    <Star size={20} strokeWidth={1}/>
                                    <h1 className="text-xl font-light">{item.vote_average ? `${item.vote_average.toFixed(1)}/10`  : 'NA'}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link> 
            ))}
        </>
    )
}