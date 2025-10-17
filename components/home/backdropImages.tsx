'use client'

export function BackDropImages({img} : {img : string}){

    
    return (
        <div className="w-full h-full relative mask-b-from-0%  mask-b-to-99%">
            <img
                src={img ? `https://image.tmdb.org/t/p/original${img}` : '/placeholder-movie.jpg'}
                className="absolute inset-0 object-cover w-full h-full"
            />

        </div>
    )
}