'use client'
import Link from 'next/link'
import {Swiper ,SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import {Pagination,Navigation} from 'swiper/modules'

const SwiperComponent =({movies} : {movies:any}) => {
        
        return(
            <>


               <Swiper
                   
                    draggable = {true}
                    loop={true}
                    modules={[ Navigation]}
                    className="w-full cursor-grab "
                    breakpoints={{
                        320: { slidesPerView: 1 },   // Small phones
                        640: { slidesPerView: 2 },   // Bigger phones
                        1024: { slidesPerView: 4 },  // Tablets & laptops
                        1280: { slidesPerView: 5 },  // Large desktops
                    }}
                    >
                    {movies.map((movie: any) => (
                        <SwiperSlide key={movie.id} className='w-fit '>
                            <Link href={`/${movie.mediaType}/${movie.id}`}  key={movie.id} className="block max-w-[300px]  mx-auto" > 
                                <div className="relative w-full aspect-[2/3]  cursor-pointer mt-15 mb-10">
                                    <div className="absolute inset-0 rounded-xs border border-white/10 flex items-end">
                                        <h1 className="text-2xl pl-5 pb-5 font-bold text-white/20">+ Add to Watchlist</h1>
                                    </div>
                                    <div className="group relative w-full h-full rounded-xs overflow-hidden shadow-xs 
                                                    duration-300 transform
                                                    hover:translate-x-8 hover:-translate-y-14 hover:z-10">
                                    
                                        <img
                                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder-movie.jpg'}
                                        alt={movie.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 duration-300"
                                        />
                                    
                                
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                                    
                                    
                                        <div className="absolute bottom-0 p-4 text-white space-y-2">
                                            <h1 className="text-2xl font-bold">{movie.title || movie.name}</h1>
                                            <h1 className="text-xl font-light">{movie.vote_average.toFixed(1)}/10</h1>
                                            </div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                    </Swiper>
               

            </>
        )
    }
    
    export default SwiperComponent
