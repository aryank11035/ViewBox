import Link from "next/link"
import { Star } from "lucide-react"
import { Movie } from "@/schema/type"
export default function MediaCard({mediaData,} : {mediaData : Movie } ){
  
   

    return(
        <>
            
                <Link href={`/${mediaData.mediaType ? mediaData.mediaType : mediaData.media_type}/${mediaData.id}`}  key={mediaData.id} > 
                    <div className="relative w-full aspect-[2/3]  cursor-pointer  shadow-xl shadow-black/30 mx-auto mt-15">
                        <div className="absolute inset-0 rounded-xs border border-white/10 flex items-end">
                            <h1 className="text-xl pl-5 pb-5 font-bold text-white/20">+ Add to Watchlist</h1>
                        </div>
                        <div className="group relative w-full h-full rounded-xs overflow-hidden shadow-xs 
                                        bg-[#111111]
                                        duration-300 transform
                                        hover:translate-x-8 hover:-translate-y-14 hover:z-10">
                            {
                                mediaData.poster_path ? 
                                    <img
                                        src={mediaData.poster_path ? `https://image.tmdb.org/t/p/w500${mediaData.poster_path}` : '/placeholder-movie.jpg'}
                                        alt={mediaData.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 duration-300 mask-b-from-50% mask-b-to-90%"
                                    />
                                    :
                                    <div className="absoulte inset-0 w-full h-full  backdrop-blur-lg"></div>
                            }         
                                        
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 p-4 text-white space-y-2">
                                <h1 className="text-2xl font-bold">{mediaData.title || mediaData.name}</h1>
                                <div className='flex gap-2  items-center'>
                                    <Star size={20} strokeWidth={1}/>
                                    <h1 className="text-xl font-light">{mediaData.vote_average ? `${mediaData.vote_average.toFixed(1)}/10`  : 'NA'}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link> 
            
        </>
    )
}