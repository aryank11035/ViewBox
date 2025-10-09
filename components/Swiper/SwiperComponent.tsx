'use client'
import Link from 'next/link'
import {Swiper ,SwiperSlide} from 'swiper/react'
import { Star } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import {Navigation} from 'swiper/modules'
import { Movie } from '@/schema/type'
import MediaCard from '@/components/mediaCard'




const SwiperComponent =  ({mediaData} : {mediaData: Movie[]}) => {
       

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
                            <div className='block max-w-[300px]  mx-auto shadow-xl shadow-black/30'>
                                <MediaCard mediaData={media}/> 
                            </div>
                        </SwiperSlide>
                    ))}
                    </Swiper>
               

            </>
        )
    }
    
    export default SwiperComponent
