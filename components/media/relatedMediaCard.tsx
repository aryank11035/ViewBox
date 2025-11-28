import {  motion } from "framer-motion"
import Link from "next/link";
import { useEffect, useState } from "react";
export function RelatedMedia({mediaData} : {mediaData : any}){

    const [isMobile, setIsMobile] = useState(false);
    const [onHover,setOnHover] = useState(false)
    useEffect(() => {
            const handleResize = () => setIsMobile(window.innerWidth < 640);
            handleResize();
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

         const name = mediaData.title ? mediaData.title : mediaData.name
    return (

            <Link href={`/${mediaData.mediaType ? mediaData.mediaType : mediaData.media_type}/${mediaData.id}/${name}`}  key={mediaData.id} > 
                <motion.div
                    onMouseEnter={() => setOnHover(true)}
                    onMouseLeave={() => setOnHover(false)}
                    className="max-w-full aspect-[2/3] relative rounded-xs bg-black/30 overflow-hidden shadow-xl flex cursor-pointer backdrop-blur-3xl"
                >

                    
                    <img src={mediaData.poster_path ? `https://image.tmdb.org/t/p/w500${mediaData.poster_path}` : '/placeholder-movie.jpg'}
                        alt={mediaData.title}
                        className="absolute inset-0  rounded-xs"
                    />
                    
                    <motion.div 
                    
                        animate={onHover ? 'hovered' : 'normal'}
                        variants={{
                            normal: {
                                translateY: isMobile ? 27 : 55,
                            },
                            hovered: {
                                translateY: isMobile ? 0 : 0,
                            },
                        }}
                        transition={{
                            duration : 0.3,
                            ease: [0, 0.71, 0.2, 1.01],
                        }}
                        className="w-full h-[33%] relative bg-[#111111]/50 backdrop-blur-3xl bottom-0 rounded-b-xs py-2 flex flex-col justify-between self-end "
                    >
                        <h1 className="text-base font-medium flex-wrap truncate md:whitespace-normal md:overflow-hidden px-2">{mediaData.title || mediaData.name}</h1>
                        <div className='flex gap-2  items-center z-20 px-2'>
                                <img 
                                src="/logo-imdb.svg" 
                                alt="IMDb Logo" 
                                className="md:w-10 w-8 h-auto" 
                            />
                            <h1 className="md:text-lg text-xs font-light">{mediaData.vote_average ? `${mediaData.vote_average.toFixed(1)}/10`  : 'NA'}</h1>
                        </div>
                        
                    </motion.div>
                </motion.div>
            </Link>
    )
}