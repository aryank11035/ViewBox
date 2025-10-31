'use client'



import SwiperComponent from "@/components/Swiper/SwiperComponent"
import { useEffect, useState } from "react"
export default function WatchListSection({media} : {media : any[] }){

    const [show , setShowData] = useState <any[]>(media) 
    useEffect(() => {
        setShowData(media)
    },[media])

    return (
        <>
                    { media.length > 0 &&  (<div className="w-full h-fit">
                        <div className="relative w-full md:w-fit h-fit md:ml-7  shadow-xl shadow-black/50 ">
                            <div className="hidden md:block
                                absolute inset-0 
                                border border-[rgba(255,255,255,0.2)]
                                bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.1)_0,rgba(255,255,255,0.1)_1px,transparent_0,transparent_50%)]
                                bg-[size:10px_10px] 
                                bg-fixed">
                            </div>
                            <div className="cursor-pointer relative transform border md:text-left text-2xl md:text-4xl font-bold font-sans px-4 py-3 bg-white text-[#111111] text-center w-full md:w-fit md:translate-x-3 md:-translate-y-3 hover:z-10 transition-all duration-300 hover:translate-x-0 hover:translate-y-0  active:translate-x-0 active:-translate-y-0 active:bg-transparent active:text-white active:border-[rgba(0,0,0,0.2)]">
                                Your Watchlist
                            </div>
                        </div>
                        <div className="mb-10">
                            <SwiperComponent mediaData={show} />
                        </div>
                        <h1 className="block md:hidden text-white/20 font-medium text-2xl text-center mb-10">{`Swipe >>` }</h1>
                    </div>)}</>
    )
}