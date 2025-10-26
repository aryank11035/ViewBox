'use client'

export function ResultDisplay({results , getMediaInfo , loading } : {results : any , getMediaInfo : any , loading : boolean}){


    const searchedMedia = results.map((media : any) => (
        <div className="w-full h-30 p-2 flex flex-row gap-2 border-b border-b-white/10 hover:bg-white/10 rounded-xs duration-100 cursor-pointer" key={media.id} onClick={() => getMediaInfo(media.id , media.mediaType)}>
            <div className="w-20 aspect-[2/3] relative">
                <img 
                    src={media.poster_path ? `https://image.tmdb.org/t/p/w500${media.poster_path}` : '/placeholder-movie.jpg'}
                    alt={media.title}
                    className="absolute inset-0 h-full w-full rounded-[0.150rem]"
                    />
            </div>
            <div className="w-[90%] h-full ">
                <div className="flex flex-col  h-full">
                    <h1 className="text-xl font-bold">{media.title || media.original_name}</h1>
                    <p className="text-white/30">{media.release_date || media.first_air_date}</p>
                </div>
            </div>
        </div>
        )
    )
    
    const loadingSkeleton = Array.from({length : 5}).map((_,i) => (
         <div key={i} className="w-full h-30 p-2 flex flex-row gap-2 border-b border-b-white/10 rounded-xs">
            <div className="w-20 aspect-[2/3] relative bg-white/10 rounded-xs"></div>
            <div className="w-[90%] h-full flex flex-col gap-2">
                <div className="rounded-xs bg-white/10 h-10 w-full max-w-sm"></div>
                <div className="rounded-xs bg-white/10 h-5 max-w-xs w-full"></div>
            </div>
        </div>
    )) 

    return (
        <>
            {
                loading ? loadingSkeleton : searchedMedia
            }
        </>
    )
    
}