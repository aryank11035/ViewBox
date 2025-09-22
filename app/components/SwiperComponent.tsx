'use client'
import Link from 'next/link'
import {Swiper ,SwiperSlide} from 'swiper/react'
import { Star } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import {Pagination,Navigation} from 'swiper/modules'

const SwiperComponent =({mediaData} : {mediaData:any}) => {
        
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
                        1024: { slidesPerView: 3 },  // Tablets & laptops
                        1200 : {slidesPerView : 4},
                        1500: { slidesPerView: 5 },  // Large desktops
                        
                    }}
                    >
                    {mediaData.map((media: any) => (
                        <SwiperSlide key={media.id} className='w-fit '>
                            <Link href={`/${media.mediaType ? media.mediaType : media.media_type}/${media.id}`}  key={media.id} className="block max-w-[300px]  mx-auto shadow-xl shadow-black/30"   > 
                                <div className="relative w-full aspect-[2/3]  cursor-pointer mt-15 mb-10">
                                    <div className="absolute inset-0 rounded-xs border border-white/10 flex items-end">
                                        <h1 className="text-2xl pl-5 pb-5 font-bold text-white/20">+ Add to Watchlist</h1>
                                    </div>
                                    <div className="group relative w-full h-full rounded-xs overflow-hidden shadow-xs 
                                                    duration-300 transform
                                                    hover:translate-x-8 hover:-translate-y-14 hover:z-10">
                                    
                                        <img
                                        src={media.poster_path ? `https://image.tmdb.org/t/p/w500${media.poster_path}` : '/placeholder-movie.jpg'}
                                        alt={media.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 duration-300"
                                        />
                                    
                                
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                                    
                                    
                                        <div className="absolute bottom-0 p-4 text-white space-y-2 ">
                                            <h1 className="text-2xl font-bold">{media.title || media.name}</h1>
                                            <div className='flex gap-2  items-center'>
                                                <Star size={20} strokeWidth={1}/>
                                                <h1 className="text-xl font-light inline-block">{media.vote_average.toFixed(1)}/10</h1>
                                            </div>
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
